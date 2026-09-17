import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

interface ContactSubmission {
	name: string;
	email: string;
	message: string;
	submittedAt: string;
	emailSent: boolean;
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {

	let body: { name?: string; email?: string; message?: string };
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid request body.' }), { status: 400 });
	}

	const name = (body.name ?? '').trim();
	const email = (body.email ?? '').trim();
	const message = (body.message ?? '').trim();

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
	}
	if (!isValidEmail(email)) {
		return new Response(JSON.stringify({ error: 'Please provide a valid email address.' }), { status: 400 });
	}

	const submissionId = crypto.randomUUID();
	const submission: ContactSubmission = {
		name,
		email,
		message,
		submittedAt: new Date().toISOString(),
		emailSent: false,
	};

	// Store first, so the submission survives even if the email step fails.
	await env.CONTACT_SUBMISSIONS.put(submissionId, JSON.stringify(submission));

	let emailSent = false;
	let emailError: string | undefined;
	try {
		const resendResponse = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'HartSoft.Dev Contact Form <contact@hartsoft.dev>',
				to: 'lee@hartsoft.dev',
				reply_to: email,
				subject: `New contact form message from ${name}`,
				text: `From: ${name} <${email}>\n\n${message}`,
			}),
		});
		emailSent = resendResponse.ok;
		if (!emailSent) {
			emailError = await resendResponse.text();
			console.error('Resend API error:', resendResponse.status, emailError);
		}
	} catch (err) {
		emailError = err instanceof Error ? err.message : String(err);
		console.error('Resend fetch failed:', emailError);
	}

	submission.emailSent = emailSent;
	await env.CONTACT_SUBMISSIONS.put(submissionId, JSON.stringify({ ...submission, emailError }));

	return new Response(JSON.stringify({ success: true, emailSent }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};
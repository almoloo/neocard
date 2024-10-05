import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const formData = await request.formData();
		const file = (formData.get('file') as File) ?? null;

		if (!file) {
			return NextResponse.json(
				{ message: 'No file found in the request' },
				{ status: 400 }
			);
		}

		const form = new FormData();
		form.append('file', file);
		form.append('pinataMetadata', JSON.stringify({ name: 'file' }));
		form.append('pinataOptions', JSON.stringify({ cidVersion: 0 }));

		const response = await fetch(
			'https://api.pinata.cloud/pinning/pinFileToIPFS',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.PINATA_JWT}`,
				},
				body: form,
			}
		);

		const data = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

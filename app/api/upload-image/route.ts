import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary-server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64String}`;

    console.log('Uploading to Cloudinary...', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    // Upload to Cloudinary using the SDK
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'blog-featured-images',
      resource_type: 'image',
    });

    console.log('Upload successful:', result.secure_url);
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
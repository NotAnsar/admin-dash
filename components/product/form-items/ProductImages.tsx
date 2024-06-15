'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ProductALL } from '@/types/db';
import { Trash2, Upload } from 'lucide-react';
import Image from 'next/image';

import { Dispatch, SetStateAction, useState } from 'react';

export default function ProductImages({
	product,
	selectedImages,
	setSelectedImages,
}: {
	product?: ProductALL;
	selectedImages: File[];
	setSelectedImages: Dispatch<SetStateAction<File[]>>;
}) {
	// const [selectedImages, setSelectedImages] = useState<File[]>([]);
	// const [images, setImages] = useState<string[]>([
	// 	// 'https://oekyfpijfizbaexjkhbg.supabase.co/storage/v1/object/public/product_images/User_Dashboard.png',
	// 	// 'https://oekyfpijfizbaexjkhbg.supabase.co/storage/v1/object/public/product_images/addUser.png',
	// 	// 'https://oekyfpijfizbaexjkhbg.supabase.co/storage/v1/object/public/product_images/develop-a-responsive-react-js-firebase-web-app.png',
	// 	// 'https://oekyfpijfizbaexjkhbg.supabase.co/storage/v1/object/public/product_images/Saly-13.png',
	// ]);

	const removeImage = (imageToRemove: File) => {
		setSelectedImages((prev) => prev.filter((file) => file !== imageToRemove));
	};

	console.log(selectedImages);

	return (
		<Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
			<CardHeader>
				<CardTitle>Product Images</CardTitle>
				<CardDescription>
					Upload and manage your product images here.
					<br />
					Minimum 1 image, maximum 4 images.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className={cn('grid gap-2 mb-2 grid-cols-2')}>
					{selectedImages.map(
						(image, i) =>
							image && (
								<ProductImage
									src={image}
									key={i}
									remove={() => removeImage(image)}
								/>
							)
					)}
				</div>

				<div className={cn('grid grid-cols-1 gap-2')}>
					<label
						className={cn(
							buttonVariants({ variant: 'ghost' }),
							'flex h-12 w-full items-center justify-center rounded-md border border-dashed hover:cursor-pointer relative'
						)}
						htmlFor='product_images'
					>
						<Upload className='h-auto w-4 aspect-square text-muted-foreground' />
						<span className='sr-only'>Upload</span>
						<Input
							type='file'
							accept='.jpg,.jpeg,.png,.gif'
							id='product_images'
							readOnly
							multiple
							max='4'
							min='1'
							required
							className='sr-only'
							name='product_images'
							onChange={(e) => {
								if (e.target.files) {
									const newImages = Array.from(e.target.files);
									const valid = validateFileType(e.target.files);
									if (!valid) {
										toast({
											title: 'Invalid file type',
											description: 'Please upload a valid file type.',
										});
										return;
									}

									const totalImages = selectedImages.length + newImages.length;
									if (totalImages > 4) {
										toast({
											title: 'Maximum number of images',
											description: 'You can only upload a maximum of 4 images.',
										});

										return;
									}

									setSelectedImages((prevImages) => [
										...prevImages,
										...newImages,
									]);
								}
							}}
						/>
					</label>
				</div>
			</CardContent>
		</Card>
	);
}

export function validateFileType(files: FileList): boolean {
	const validTypes = ['image/png', 'image/jpeg'];
	return Array.from(files).every((file) => validTypes.includes(file.type));
}

import React from 'react';

function ProductImage({ src, remove }: { src: File; remove: () => void }) {
	return (
		<div className='relative group rounded-md border border-border overflow-hidden'>
			<Image
				src={URL.createObjectURL(src)}
				// src={src}
				alt=''
				width={700}
				height={700}
				className='w-full h-auto aspect-square  object-cover'
			/>
			<span
				// className='w-5 h-auto aspect-square place-items-center bg-foreground/80 hidden cursor-pointer group-hover:grid absolute top-0 right-0'
				className='w-full h-full aspect-square place-items-center bg-secondary/90 hidden cursor-pointer group-hover:grid absolute inset-0'
				onClick={remove}
			>
				<Trash2 className='w-3/12 h-auto text-destructive   ' />
			</span>
		</div>
	);
}

'use server';

import {z} from 'zod';
import fs from 'fs/promises';
import path from 'path';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  isSuccess?: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map(issue => issue.message);
    return {
      message: 'Invalid form data.',
      issues,
      fields: {
        name: formData.name as string,
        email: formData.email as string,
        phone: formData.phone as string,
        message: formData.message as string,
      },
    };
  }

  // Here you would typically send an email, save to a database, etc.
  console.log('Form data submitted:', parsed.data);

  return {
    message: 'Thank you for your message! We will get back to you shortly.',
    isSuccess: true,
  };
}

export async function saveThemesToFile() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'globals.css');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // This is a simplified example. In a real app, you might want to format this as JSON
    // or another structured format. For now, we'll just return the raw CSS content.
    return { success: true, content: fileContent, filename: 'themes.css' };
  } catch (error) {
    console.error('Error saving themes:', error);
    return { success: false, message: 'Failed to save themes.' };
  }
}

export async function loadThemesFromFile(fileContent: string) {
    try {
        const filePath = path.join(process.cwd(), 'src', 'app', 'globals.css');
        await fs.writeFile(filePath, fileContent, 'utf-8');
        return { success: true, message: 'Themes loaded successfully. Please refresh the page to see the changes.' };
    } catch (error) {
        console.error('Error loading themes:', error);
        return { success: false, message: 'Failed to load themes.' };
    }
}

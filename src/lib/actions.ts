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
    const globalsPath = path.join(process.cwd(), 'src', 'app', 'globals.css');
    const tailwindPath = path.join(process.cwd(), 'tailwind.config.ts');

    const globalsContent = await fs.readFile(globalsPath, 'utf-8');
    const tailwindContent = await fs.readFile(tailwindPath, 'utf-8');
    
    return { 
      success: true, 
      files: [
        { name: 'globals.css', content: globalsContent },
        { name: 'tailwind.config.ts', content: tailwindContent }
      ]
    };
  } catch (error) {
    console.error('Error reading theme files:', error);
    return { success: false, message: 'Failed to read theme configuration files.' };
  }
}

const themeFilesSchema = z.object({
  globals: z.string(),
  tailwind: z.string(),
});

export async function loadThemesFromFile(fileContents: { globals: string; tailwind: string }) {
    try {
        const parsedContents = themeFilesSchema.safeParse(fileContents);
        if (!parsedContents.success) {
            return { success: false, message: 'Invalid file contents.' };
        }

        const { globals, tailwind } = parsedContents.data;
        
        const globalsPath = path.join(process.cwd(), 'src', 'app', 'globals.css');
        const tailwindPath = path.join(process.cwd(), 'tailwind.config.ts');
        
        await fs.writeFile(globalsPath, globals, 'utf-8');
        await fs.writeFile(tailwindPath, tailwind, 'utf-8');
        
        return { success: true, message: 'Themes loaded successfully. Please refresh the page to see the changes.' };
    } catch (error) {
        console.error('Error loading themes:', error);
        return { success: false, message: 'Failed to load and apply theme files.' };
    }
}

export async function getThemes(): Promise<{ success: boolean, themes?: string[], message?: string }> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'globals.css');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const themeRegex = /\.(?<name>[\w-]+)\s*\{\s*--primary:/g;
    
    const themes: string[] = ['default'];
    let match;
    while ((match = themeRegex.exec(fileContent)) !== null) {
      if (match.groups?.name) {
        themes.push(match.groups.name);
      }
    }
    
    // Add light and dark separately if not found as classes
    if (!themes.includes('light')) themes.unshift('light');
    if (!themes.includes('dark')) themes.splice(1, 0, 'dark');

    const uniqueThemes = [...new Set(themes)];

    if (uniqueThemes.length === 0) {
      return { success: false, message: 'No themes found.' };
    }

    return { success: true, themes: uniqueThemes };
  } catch (error) {
    console.error('Error getting themes:', error);
    return { success: false, message: 'Failed to get themes.' };
  }
}

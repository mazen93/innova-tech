import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('api')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  // --- SERVICES ---
  @Get('services')
  getServices() {
    return this.prisma.service.findMany();
  }

  @Post('services')
  createService(@Body() data: { name: string; nameAr?: string; description: string; descriptionAr?: string; icon?: string }) {
    return this.prisma.service.create({ data });
  }

  @Delete('services/:id')
  deleteService(@Param('id') id: string) {
    return this.prisma.service.delete({ where: { id: Number(id) } });
  }

  @Patch('services/:id')
  updateService(@Param('id') id: string, @Body() data: { name?: string; nameAr?: string; description?: string; descriptionAr?: string; icon?: string }) {
    return this.prisma.service.update({ where: { id: Number(id) }, data });
  }

  // --- PRODUCTS ---
  @Get('products')
  getProducts() {
    return this.prisma.product.findMany();
  }

  @Post('products')
  createProduct(@Body() data: { name: string; nameAr?: string; tagline: string; taglineAr?: string; description: string; descriptionAr?: string; features: string; featuresAr?: string; image?: string; link?: string }) {
    return this.prisma.product.create({ data });
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    return this.prisma.product.delete({ where: { id: Number(id) } });
  }

  @Patch('products/:id')
  updateProduct(@Param('id') id: string, @Body() data: { name?: string; nameAr?: string; tagline?: string; taglineAr?: string; description?: string; descriptionAr?: string; features?: string; featuresAr?: string; image?: string; link?: string }) {
    return this.prisma.product.update({ where: { id: Number(id) }, data });
  }

  // --- CONTACTS ---
  @Get('contacts')
  getContacts() {
    return this.prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Post('contacts')
  createContact(@Body() data: { name: string; email: string; company?: string; message: string }) {
    return this.prisma.contactMessage.create({ data });
  }

  @Delete('contacts/:id')
  deleteContact(@Param('id') id: string) {
    return this.prisma.contactMessage.delete({ where: { id: Number(id) } });
  }

  // --- AUTH ---
  @Post('auth/login')
  login(@Body() data: { password?: string }) {
    // Simple mock auth for MVP
    if (data.password === 'admin123') {
      return { success: true, token: 'mock-token' };
    }
    return { success: false };
  }

  // --- THEME ---
  @Get('theme')
  async getTheme() {
    let theme = await this.prisma.themeSettings.findFirst();
    if (!theme) {
      theme = await this.prisma.themeSettings.create({
        data: { 
          primaryColor: '#2563eb', 
          primaryButtonTextColor: '#ffffff',
          textColor: '#0f172a', 
          sectionBgColor: '#f8fafc', 
          sectionBgColorAlt: '#ffffff',
          borderColor: '#e2e8f0',
          sidebarBgColor: '#ffffff'
        }
      });
    }
    return theme;
  }

  @Patch('theme')
  async updateTheme(@Body() data: { 
    primaryColor?: string; 
    primaryButtonTextColor?: string;
    textColor?: string; 
    sectionBgColor?: string; 
    sectionBgColorAlt?: string; 
    borderColor?: string;
    sidebarBgColor?: string;
    logoUrl?: string;
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    youtubeUrl?: string;
    tiktokUrl?: string;
  }) {
    let theme = await this.prisma.themeSettings.findFirst();
    if (!theme) {
      return this.prisma.themeSettings.create({ data: { 
        primaryColor: data.primaryColor || '#2563eb', 
        primaryButtonTextColor: data.primaryButtonTextColor || '#ffffff',
        textColor: data.textColor || '#0f172a',
        sectionBgColor: data.sectionBgColor || '#f8fafc',
        sectionBgColorAlt: data.sectionBgColorAlt || '#ffffff',
        borderColor: data.borderColor || '#e2e8f0',
        sidebarBgColor: data.sidebarBgColor || '#ffffff',
        logoUrl: data.logoUrl || null,
        facebookUrl: data.facebookUrl || null,
        twitterUrl: data.twitterUrl || null,
        instagramUrl: data.instagramUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        youtubeUrl: data.youtubeUrl || null,
        tiktokUrl: data.tiktokUrl || null
      } });
    }
    return this.prisma.themeSettings.update({ where: { id: theme.id }, data });
  }
}

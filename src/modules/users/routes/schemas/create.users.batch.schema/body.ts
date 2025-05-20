import { MultipartFile } from '@fastify/multipart';
import { z } from 'zod';

export const body = z.custom<MultipartFile>();

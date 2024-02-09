import * as z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string().length(6))
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    })
})

export const NewPasswordSchema = z.object({
    token: z.string({
        required_error: "Token required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    })
})

export const ResetPasswordSchema = LoginSchema.omit({password: true, code: true});


export const GameUpdateSchema = z.object({
    id: z.string().email({
        message: "Email is required",
    }),
    name: z.string().email({
        message: "Email is required",
    }),
    price: z.number({
            required_error: "Price is required",
            invalid_type_error: "Price must be an integer"
        }),
    description: z.string({
        required_error: "Description is required"
    }),
    image: z.any()
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    genresId: z
        .array(z.string(), {invalid_type_error: "Invalid genres"})
        .nonempty({message: "Choose at least one genre"
    }),
    tagsId: z.array(z.string(), {
        invalid_type_error: "Invalid tags"
    })
})

export const GameCreateSchema = GameUpdateSchema.omit({id: true});

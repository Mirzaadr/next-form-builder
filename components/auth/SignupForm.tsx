"use client"
import React, { useTransition } from 'react'
import CardWrapper from './CardWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignupSchema } from '@/lib/validations';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { register } from '@/lib/actions/signup';
import { toast } from 'sonner';
import Link from 'next/link';
import Spinner from '@/components/common/Spinner';


type SignupFormProps = {
  name?: string;
}

const SignupForm = (props: SignupFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    startTransition(() => {
      register(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
        }
        toast.success(res.message);
      })
    });
  }

  return (
    <CardWrapper
      label="Create an account"
      showSocial={false}
      footer={
        <Button variant="link" className='font-normal w-full' size={"sm"} asChild>
          <Link href={"/auth/signin"}>
            {"Already have an account?"}
          </Link>
        </Button>
      }
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='Your Name'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />
          </div>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='jon.doe@example.com'
                      type='email' 
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />
          </div>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder='password'
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? <Spinner size="sm"/> : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default SignupForm;
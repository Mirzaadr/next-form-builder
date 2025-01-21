"use client"
import React, { useTransition } from 'react'
import CardWrapper from '@/components/auth/CardWrapper';
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
import { SigninSchema } from '@/lib/validations';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/lib/actions/signin';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/settings';
import Spinner from '@/components/common/Spinner';


type LoginFormProps = {
  name?: string;
}

const LoginForm = (props: LoginFormProps) => {
  const searchParams = useSearchParams();
  const callbackUrl= searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already used with different provider!" : "";
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof SigninSchema>) => {
    startTransition(() => {
      login(values, callbackUrl).then((res) => {
        if (!res.success) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          // redirect(DEFAULT_LOGIN_REDIRECT);
        }
      });
    });
  }

  return (
    <CardWrapper
      label="Welcome back"
      showSocial={false}
      footer={(
        <Button variant="link" className='font-normal w-full' size={"sm"} asChild>
          <Link href={"/auth/signup"}>
            {"Don't have an account?"}
          </Link>
        </Button>
      )}
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <>
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
            </>
          </div>
          <Button type='submit' className='w-full' disabled={isPending}>
            {isPending ? <Spinner size="sm"/> : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm;
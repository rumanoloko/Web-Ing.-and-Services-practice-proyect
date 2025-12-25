'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormValues {
  name: string;
  surname: string;
  birthdate: string;
  address: string;
  email: string;
  password: string;
}

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    surname: '',
    birthdate: '',
    address: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;

    console.log("CONTENIDO DE BODY")
    console.log(JSON.stringify(formValues));
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(formValues),
    });

    if (res.ok) {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });

      if (res.ok) {
        setError('');
        router.push('/');
        router.refresh();
      } else {
        const data = await res.json();
        if (data.error === 'WRONG_CREDENTIALS') {
          setError('Wrong e-mail or password.');
        } else {
          setError('An error occurred while login processing your request. Please try again later.');
        }
      }
      //console.log("Creacion de cuenta exitosa")
      setError('');
      //router.push('/auth/signin');
      //router.refresh();
    } else {
      const data = await res.json();
      if (data.error === 'WRONG_SIGNUP_INFORMATION') {
        setError('Wrong one or more data offered for sing up process');
      } else {
        setError('An error occurred while sing up processing your request. Please try again later.');
      }
    }
  };

  return (
    <form className="group space-y-6 " onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="given-name"
          placeholder="Petru"
          required
          className="peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
               placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
               invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
          value={formValues.name}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      {/* Surname */}
      <div>
        <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
          Surname
        </label>
        <input
          id="surname"
          name="surname"
          type="text"
          autoComplete="family-name"
          placeholder="Vlad"
          required
          className="peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
               placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
               invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
          value={formValues.surname}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, surname: e.target.value }))
          }
        />
      </div>

      {/* Birthday */}
      <div>
        <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
          Birthday
        </label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          autoComplete="bday"
          required
          className="peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
               placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
               invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
          value={formValues.birthdate}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, birthdate: e.target.value }))
          }
        />
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder="Calle Pepe Botella nr.23"
          required
          className="peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
               placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
               invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
          value={formValues.address}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, address: e.target.value }))
          }
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          E-mail address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="petru@example.com"
          required
          className="peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                     placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                     invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
          value={formValues.email}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <p className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          Please provide a valid email address.
        </p>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder=" "
          required
          className="peer mt-2 block w-full rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                     placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                     invalid:[&:not(:placeholder-shown):not(:focus)]:ring-red-500"
          value={formValues.password}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <p className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
          Please input your password.
        </p>
      </div>

      {error && (
        <div>
          <p className="mt-2 rounded-md border-0 bg-red-500 bg-opacity-30 px-3 py-1.5 text-sm text-gray-900 ring-1 ring-inset ring-red-500">
            {error}
          </p>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                     hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                     group-invalid:pointer-events-none group-invalid:opacity-30"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

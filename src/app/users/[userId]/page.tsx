'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UserPage({ params }: { params: { userId: string } }) {
  const { data: user, error, isLoading } = useSWR(`/api/users/${params.userId}`, fetcher);

  if (isLoading) return <p>Cargando usuario...</p>;
  if (error) return <p>Error al cargar usuario</p>;

  return (
    <div>
      <h1>User Info</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

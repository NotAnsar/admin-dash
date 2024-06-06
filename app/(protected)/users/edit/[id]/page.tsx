import EditUserForm from '@/components/user/EditUserForm';
import { fetchUserById } from '@/lib/user';
import { notFound } from 'next/navigation';

export default async function page({
	params: { id },
}: {
	params: { id: string };
}) {
	const user = await fetchUserById(id);
	if (!user) notFound();

	return <EditUserForm user={user} />;
}

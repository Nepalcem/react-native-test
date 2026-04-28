import { ClientRegistrationForm } from '@/components/ClientRegistrationForm';
import { MasterRegistrationForm } from '@/components/MasterRegistrationForm';
import { useLocalSearchParams } from 'expo-router';

type RoleParam = 'client' | 'master';

export default function RegisterPage() {
  const { role } = useLocalSearchParams<{ role?: RoleParam }>();

  if (role === 'master') return <MasterRegistrationForm />;
  return <ClientRegistrationForm />;
}


import { MentoraApp } from '@/components/MentoraApp';
export default function Page() {
  return (
    <MentoraApp
      initialScreen="booking"
      initialRole="learner"
      initialBookingState={{ day: 20, slot: '09:00' }}
    />
  );
}

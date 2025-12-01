"use client"
import InvitationCard from "@/components/invitation-card"
import CustomCursor from "@/components/custom-cursor"

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <CustomCursor />
      <InvitationCard />
    </main>
  )
}

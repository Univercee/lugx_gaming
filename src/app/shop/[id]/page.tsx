export default function Home({ params }: { params: { id: string } }) {
  return (
    <main>
      <p>Game {params.id} page</p>
    </main>
  );
}

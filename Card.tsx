
export default function Card({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section
      style={{
        background: '#121212',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        border: '1px solid #1f1f1f'
      }}
    >
      <h2 style={{
        marginTop: 0,
        marginBottom: 20,
        fontSize: 24
      }}>
        {title}
      </h2>

      {children}
    </section>
  );
}

type UnderDevelopmentProps = { title: string };

export default function UnderDevelopment({ title }: UnderDevelopmentProps) {
  return (
    <main className="development-page">
      <h1>{title}</h1>
      <p className="page-subtitle">This module is under development and will be available soon.</p>
      <section className="development-workspace">
        <div className="development-status"><span />In development</div>
        <div className="development-grid">
          <article><strong>Live data</strong><p>Connected to the CashReady platform and ready for upcoming service data.</p></article>
          <article><strong>Designed for teams</strong><p>Built to bring faster decisions and clearer ATM operations into one place.</p></article>
          <article><strong>Next release</strong><p>Updates will appear here automatically as this module becomes available.</p></article>
        </div>
      </section>
    </main>
  );
}
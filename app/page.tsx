import { MatrixRain } from "@/components/MatrixRain";
import { portfolioContent } from "@/lib/portfolio-content";

function LinkedInAction({ className = "" }: { className?: string }) {
  const { label, url } = portfolioContent.contact;

  if (!url) {
    return (
      <span
        className={`text-link text-link--disabled ${className}`.trim()}
        aria-disabled="true"
        title="Add your LinkedIn URL in the portfolio content file to enable this link."
      >
        {label}
        <span aria-hidden="true">↗</span>
      </span>
    );
  }

  return (
    <a
      className={`text-link ${className}`.trim()}
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} (opens in a new tab)`}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  const { identity, hero, projects, capabilities, process, manifesto } =
    portfolioContent;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <MatrixRain />
      <div className="ambient-overlay" aria-hidden="true" />

      <div className="page-shell">
        <header className="site-header">
          <div className="layout header-inner">
            <a className="brand" href="#top" aria-label="Back to the top">
              <span>{identity.firstName}</span>
              <span className="brand-mark" aria-hidden="true">
                /
              </span>
            </a>

            <nav className="site-nav" aria-label="Primary navigation">
              <a href="#work">Work</a>
              <a className="nav-wide" href="#capabilities">
                Capabilities
              </a>
              <a className="nav-wide" href="#process">
                Process
              </a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </header>

        <main id="main-content">
          <section className="hero layout" id="top" aria-labelledby="hero-title">
            <div className="hero-topline">
              <p className="eyebrow">{hero.eyebrow}</p>
              <p className="availability">
                <span aria-hidden="true" /> {identity.availability}
              </p>
            </div>

            <h1 id="hero-title">
              I build <span>digital products</span> that move like ideas.
            </h1>

            <div className="hero-bottom">
              <p className="hero-copy">{hero.intro}</p>
              <div className="hero-actions" aria-label="Hero actions">
                <LinkedInAction className="text-link--primary" />
                <a className="text-link" href="#work">
                  Explore selected work <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="hero-index" aria-hidden="true">
                00 — PORTFOLIO / PREVIEW
              </p>
            </div>
          </section>

          <section className="section layout" id="work" aria-labelledby="work-title">
            <div className="section-heading">
              <p className="section-kicker">01 / Selected work</p>
              <div>
                <h2 id="work-title">Ideas, engineered into form.</h2>
                <p className="section-lede">
                  Three placeholder concepts showing how real work will be
                  presented: clearly, honestly, and without invented outcomes.
                </p>
              </div>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <article className="project-row" key={project.name}>
                  <p className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="project-name">
                    <p className="concept-label">Concept placeholder</p>
                    <h3>{project.name}</h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <p className="project-stack">
                    {project.stack.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </p>
                  <span className="project-arrow" aria-hidden="true">
                    ↗
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section
            className="section layout"
            id="capabilities"
            aria-labelledby="capabilities-title"
          >
            <div className="section-heading section-heading--compact">
              <p className="section-kicker">02 / Capabilities</p>
              <h2 id="capabilities-title">One partner. The whole product.</h2>
            </div>

            <div className="capability-list">
              {capabilities.map((capability, index) => (
                <article className="capability-row" key={capability.title}>
                  <p className="capability-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="manifesto layout" aria-labelledby="manifesto-title">
            <p className="section-kicker">03 / Working principle</p>
            <h2 id="manifesto-title">{manifesto.headline}</h2>
            <p className="manifesto-copy">{manifesto.copy}</p>
          </section>

          <section
            className="section layout"
            id="process"
            aria-labelledby="process-title"
          >
            <div className="section-heading section-heading--compact">
              <p className="section-kicker">04 / Process</p>
              <h2 id="process-title">From unclear to undeniable.</h2>
            </div>

            <ol className="process-list">
              {process.map((step, index) => (
                <li key={step.title}>
                  <p className="process-number">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="contact layout"
            id="contact"
            aria-labelledby="contact-title"
          >
            <p className="section-kicker">05 / Start something</p>
            <h2 id="contact-title">
              Have a product worth building? <span>Let&apos;s make it real.</span>
            </h2>
            <div className="contact-bottom">
              <p>
                Strategy, interface, systems, and the thinking that connects them.
              </p>
              <LinkedInAction className="contact-link" />
            </div>
          </section>
        </main>

        <footer className="site-footer layout">
          <p>© {new Date().getFullYear()} {identity.firstName}</p>
          <p>Full-stack developer / Portfolio preview</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </>
  );
}

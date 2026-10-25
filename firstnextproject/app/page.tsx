'use client';

import { useState, type FormEvent } from 'react';

type AuthMode = 'login' | 'register' | 'reset';

export default function Home() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setMessage('');
    setShowPassword(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === 'login') {
      setMessage('Authentication is not connected yet. Connect your workspace identity provider to sign in.');
    } else if (mode === 'register') {
      setMessage('Account creation is not connected yet. Connect your workspace identity provider to get started.');
    } else {
      setMessage('Password reset email delivery is not connected yet.');
    }
  }

  return (
    <main className="portal-shell">
      <section className="story-panel" aria-label="Peoplefield employee management">
        <header className="brand-bar">
          <a className="brand-lockup" href="#home" aria-label="Peoplefield home">
            <span className="brand-mark" aria-hidden="true">
              <i className="fa-solid fa-people-group" />
            </span>
            <span>peoplefield</span>
          </a>
          <span className="brand-caption">A more human workplace</span>
        </header>

        <div className="story-content" id="home">
          <p className="eyebrow"><span className="eyebrow-dot" /> GOOD WORK STARTS WITH GOOD PEOPLE</p>
          <h1>Make room for <span>great work.</span></h1>
          <p className="story-description">
            Less time chasing paperwork. More time helping your people do their best work.
          </p>

          <figure className="team-photo">
            <div
              className="team-photo-image"
              role="img"
              aria-label="Coworkers sharing ideas around a table in a sunlit office"
            />
            <figcaption className="photo-caption">
              <span className="caption-dot" />
              <span>Better days, built together.</span>
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </figcaption>
          </figure>

          <div className="feature-strip" aria-label="Platform highlights">
            <span id="people"><i className="fa-solid fa-heart" aria-hidden="true" /> People first</span>
            <span><i className="fa-solid fa-layer-group" aria-hidden="true" /> Less admin</span>
            <span><i className="fa-solid fa-seedling" aria-hidden="true" /> Room to grow</span>
          </div>
        </div>

        <footer className="story-footer">
          <span>Made for the people who make your workplace.</span>
          <span>© 2026 Peoplefield</span>
        </footer>
      </section>

      <section className="auth-panel" id="account" aria-label="Employee account">
        <div className="auth-topline">
          <span className="auth-context">
            <i className="fa-solid fa-shield-heart" aria-hidden="true" />
            YOUR WORKSPACE, IN GOOD HANDS
          </span>
          <span className="secure-note"><span /> Secure access</span>
        </div>

        <div className="auth-content" key={mode}>
          {mode === 'reset' ? (
            <>
              <button className="back-button" type="button" onClick={() => changeMode('login')}>
                <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to sign in
              </button>
              <div className="auth-heading reset-heading">
                <span className="heading-symbol" aria-hidden="true">
                  <i className="fa-regular fa-envelope" />
                </span>
                <p className="eyebrow">LET’S GET YOU BACK IN</p>
                <h2>Forgot your password?</h2>
                <p>Enter your work email and we’ll help you get back to your workspace.</p>
              </div>
              <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="reset-email">Work email</label>
                <div className="input-wrap">
                  <i className="fa-regular fa-envelope input-icon" aria-hidden="true" />
                  <input id="reset-email" type="email" name="email" autoComplete="email" placeholder="you@company.com" required />
                </div>
                <button className="submit-button" type="submit">
                  Send reset instructions <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="auth-heading">
                <p className="eyebrow">YOUR PEOPLE, YOUR PLACE</p>
                <h2>{mode === 'login' ? 'Welcome back.' : 'Let’s get started.'}</h2>
                <p>{mode === 'login' ? 'Pick up right where your team left off.' : 'A better workday starts with your people.'}</p>
              </div>

              <div className="auth-tabs" role="tablist" aria-label="Account options">
                <button
                  aria-selected={mode === 'login'}
                  className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
                  id="login-tab"
                  onClick={() => changeMode('login')}
                  role="tab"
                  type="button"
                >
                  Sign in
                </button>
                <button
                  aria-selected={mode === 'register'}
                  className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
                  id="register-tab"
                  onClick={() => changeMode('register')}
                  role="tab"
                  type="button"
                >
                  Create account
                </button>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {mode === 'register' && (
                  <div className="field-group">
                    <label htmlFor="full-name">Full name</label>
                    <div className="input-wrap">
                      <i className="fa-regular fa-user input-icon" aria-hidden="true" />
                      <input id="full-name" type="text" name="name" autoComplete="name" placeholder="Your name" required />
                    </div>
                  </div>
                )}

                <div className="field-group">
                  <label htmlFor="work-email">Work email</label>
                  <div className="input-wrap">
                    <i className="fa-regular fa-envelope input-icon" aria-hidden="true" />
                    <input id="work-email" type="email" name="email" autoComplete="email" placeholder="you@company.com" required />
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrap">
                    <i className="fa-solid fa-lock input-icon" aria-hidden="true" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      placeholder="At least 8 characters"
                      minLength={8}
                      required
                    />
                    <button
                      className="password-toggle"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {mode === 'login' && (
                  <div className="form-options">
                    <label className="remember-option">
                      <input type="checkbox" name="remember" />
                      <span>Keep me signed in</span>
                    </label>
                    <button className="text-button" type="button" onClick={() => changeMode('reset')}>
                      Forgot password?
                    </button>
                  </div>
                )}

                <button className="submit-button" type="submit">
                  {mode === 'login' ? 'Sign in to your workspace' : 'Create your account'}
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              </form>
            </>
          )}

          {message && <p className="form-feedback" role="status">{message}</p>}
        </div>

        <footer className="auth-footer">
          <span>Need a hand? Talk to your workspace administrator.</span>
          <span><i className="fa-solid fa-lock" aria-hidden="true" /> Your team’s information stays yours.</span>
        </footer>
      </section>
    </main>
  );
}
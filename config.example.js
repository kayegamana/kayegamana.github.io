/* ===========================================================
   PORTFOLIO CONFIG — public template
   -----------------------------------------------------------
   Copy this file to `config.local.js` (which is .gitignored)
   and paste your real Web3Forms access keys there. The site
   reads `window.PORTFOLIO_CONFIG` from whichever copy loads.

   Why split? So the public GitHub repo never ships real keys.
   Each form gets its own key so you can tell, in your inbox,
   which surface of the portfolio the message came from — and
   you stay under the 200/month limit per key.
   =========================================================== */

window.PORTFOLIO_CONFIG = {
  web3forms: {
    /* Main contact section form (bottom of home page) */
    main:        "YOUR-MAIN-CONTACT-FORM-KEY",

    /* Hero "Let's Talk" + nav "CONTACT" modal */
    hero:        "YOUR-HERO-CTA-KEY",

    /* "Drop a testimonial" modal */
    testimonial: "YOUR-TESTIMONIAL-KEY"
  }
};

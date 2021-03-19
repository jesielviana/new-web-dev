import { BORDER } from '../constants/colors'

export default `
  hr {
    background: ${BORDER};
    height: 3px;
  }

  pre {
    max-width: 100%;
    // background: var(--bg-color);
    margin: 0;
    margin-bottom: 1.45rem;

    .token.operator {
      // background: var(--bg-color);
    }

    ::before {
      content: '' !important;
      display: none;
    }

    ::after {
      content: '' !important;
      display: none;
    }

    code {
      padding: 0 !important;
    }
  }

  code {
    // background: var(--bg-color);
    // line-height: 1.45rem;
    padding: 0.1em 0.3em !important;

    ::before {
      content: '' !important;
      display: none;
    }

    ::after {
      content: '' !important;
      display: none;
    }
  }

  tbody tr {
    :hover {
      background: var(--bg-color);
    }
  }
`

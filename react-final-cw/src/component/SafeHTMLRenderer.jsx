import React from "react";
import DOMPurify from "dompurify";

function SafeHTMLRenderer({ htmlContent }) {
  // Sanitize the raw HTML
  const safeHTML = DOMPurify.sanitize(htmlContent);

  return (
    <div>
      <h2>Sanitized Content:</h2>
      {/* Safely render sanitized HTML */}
      <div dangerouslySetInnerHTML={{ __html: safeHTML }}></div>
    </div>
  );
}

export default SafeHTMLRenderer;

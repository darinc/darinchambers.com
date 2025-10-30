# XSS Test Cases

Paragraph with <script>alert('xss')</script> injection attempt.

Special characters: & < > " ' should be escaped.

Code block with HTML:
```
<div>Some HTML</div>
<script>alert('code block')</script>
& < > " ' in code
```

Link with script: [Click me](javascript:alert('xss'))

**Bold with <b>nested HTML</b>** and *italic with <i>nested</i>*.

`Inline code with <script>` tag.

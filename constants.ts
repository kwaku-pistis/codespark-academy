import { WeekModule } from './types';

export const CURRICULUM: WeekModule[] = [
  {
    id: 1,
    title: "Week 1: Styling Basics",
    color: "from-blue-500 to-cyan-400",
    topics: ["Intro to CSS", "Text & Background", "Layout (Margins/Padding)"],
    objectives: [
      "Understand purpose/syntax of CSS",
      "Use color, font, and background properties",
      "Understand margins, padding, borders"
    ],
    lessons: [
      {
        id: "w1-l1",
        title: "Introduction to CSS",
        description: "Unlocking the power of presentation. Learn how to transform plain HTML into beautiful designs.",
        content: `
          <h2>1. The Metaphor: Skeleton vs. Skin</h2>
          <p>Imagine a human body. The <strong>bones</strong> give it structure—that's HTML. But the skin, the clothes, the eye color, and the hairstyle—that's <strong>CSS</strong>.</p>
          <p>CSS stands for <strong>Cascading Style Sheets</strong>. Without it, the web would look like a boring Word document from 1995. With it, we can create art.</p>
          
          <hr />

          <h2>2. The Syntax: Speaking the Language</h2>
          <p>CSS is a rule-based language. You define a set of rules for groups of HTML elements. Here is the anatomy of a CSS rule:</p>
          <pre><code class="language-css">selector {
  property: value;
}</code></pre>
          <ul>
            <li><strong>Selector:</strong> Who are we talking to? (e.g., <code>h1</code>, <code>p</code>, <code>div</code>)</li>
            <li><strong>Property:</strong> What do we want to change? (e.g., <code>color</code>, <code>font-size</code>)</li>
            <li><strong>Value:</strong> How do we want to change it? (e.g., <code>red</code>, <code>20px</code>)</li>
          </ul>

          <hr />

          <h2>3. Colors: Painting the Web</h2>
          <p>There are three main ways to tell the computer which color you want:</p>
          <ul>
            <li><strong>Keywords:</strong> Simple names like <code>red</code>, <code>blue</code>, <code>cornflowerblue</code>.</li>
            <li><strong>Hex Codes:</strong> A hash followed by 6 codes, like <code>#FF5733</code>. This is what pros use.</li>
            <li><strong>RGB:</strong> Red, Green, Blue values like <code>rgb(255, 0, 0)</code>.</li>
          </ul>
          <pre><code class="language-css">h1 {
  color: #3b82f6; /* A nice shade of blue */
  background-color: #0f172a; /* Dark background */
}</code></pre>

          <hr />

          <h2>4. Typography: Making Text Readable</h2>
          <p>Text is 90% of the web. Make it look good!</p>
          <ul>
            <li><code>font-family</code>: Changing the font (e.g., 'Arial', 'Inter').</li>
            <li><code>font-size</code>: How big is it? (px, rem).</li>
            <li><code>text-align</code>: Center, left, or right alignment.</li>
          </ul>
        `,
        initialHTML: "<h1>Welcome to My Site</h1>\n<p>This text needs some style!</p>\n<p>Make me look cool.</p>",
        initialCSS: "/* Try changing the color to 'purple' */\nh1 {\n  color: blue;\n  text-align: center;\n}\n\n/* Try adding a background-color here */\np {\n  font-size: 18px;\n  font-family: sans-serif;\n}",
        initialJS: "",
        activityGoal: "Change the h1 to purple and give the paragraphs a light gray background."
      },
      {
        id: "w1-l2",
        title: "The Box Model",
        description: "The most important concept in layout. Everything is a box, even if it looks like a circle.",
        content: `
          <h2>1. The Secret Reality</h2>
          <p>Here is a secret: <strong>Every single element on a webpage is a rectangular box.</strong></p>
          <p>Even if it looks like a circle or text, the browser sees a box. Understanding how this box is built is the key to layout.</p>

          <hr />

          <h2>2. Anatomy of the Box</h2>
          <p>Imagine you are packing a fragile gift.</p>
          <ol>
            <li><strong>Content:</strong> The gift itself (the text or image).</li>
            <li><strong>Padding:</strong> The bubble wrap around the gift. It creates space <em>inside</em> the box.</li>
            <li><strong>Border:</strong> The cardboard box wall.</li>
            <li><strong>Margin:</strong> The space between this box and other boxes on the truck.</li>
          </ol>

          <hr />

          <h2>3. Visualizing Code</h2>
          <pre><code class="language-css">.my-box {
  width: 200px;         /* Size of content */
  padding: 20px;        /* Space inside border */
  border: 5px solid red;/* The wall */
  margin: 50px;         /* Space outside border */
}</code></pre>

          <hr />

          <h2>4. Common Mistakes</h2>
          <ul>
            <li><strong>Padding adds size:</strong> If you have a 100px width and 20px padding, the total width is 140px (100 + 20 + 20)!</li>
            <li><strong>Margins collapse:</strong> Vertical margins sometimes merge together.</li>
          </ul>
        `,
        initialHTML: "<div class='box'>Content</div>\n<div class='box'>Neighbor</div>",
        initialCSS: ".box {\n  background-color: #3b82f6;\n  color: white;\n  /* Add padding here to give the text room to breathe */\n  border: 2px solid white;\n  /* Add margin here to separate the boxes */\n}",
        initialJS: "",
        activityGoal: "Add 20px padding and 10px margin to separate the boxes."
      }
    ]
  },
  {
    id: 2,
    title: "Week 2: Structure & Logic",
    color: "from-purple-500 to-pink-400",
    topics: ["Divs & Classes", "Intro to JS", "Variables & Events"],
    objectives: [
      "Group elements using Divs",
      "How JS adds interactivity",
      "Basic logic and events"
    ],
    lessons: [
      {
        id: "w2-l1",
        title: "Divs & Classes",
        description: "Organization is key. Learn how to group elements and control them with precision.",
        content: `
          <h2>1. The &lt;div&gt;: The Universal Container</h2>
          <p><code>&lt;div&gt;</code> stands for "Division". It has no meaning on its own. It's just a bucket to put other tags into.</p>
          <p>Why use it? To group things! If you want a header with a logo and a menu, you wrap them in a <code>div</code>.</p>

          <hr />

          <h2>2. Classes vs. IDs</h2>
          <p>How do we style these divs? We give them names.</p>
          <ul>
            <li><strong>Class (<code>.classname</code>):</strong> Use this for groups. Like a school uniform. Many students can wear the same uniform.</li>
            <li><strong>ID (<code>#idname</code>):</strong> Use this for unique elements. Like a Student ID number. Only one element can have it.</li>
          </ul>
          <pre><code class="language-html">&lt;!-- Correct --&gt;
&lt;div class="card"&gt;...&lt;/div&gt;
&lt;div class="card"&gt;...&lt;/div&gt;

&lt;!-- Correct --&gt;
&lt;div id="main-header"&gt;...&lt;/div&gt;</code></pre>

          <hr />

          <h2>3. Layout Basics (Flexbox Intro)</h2>
          <p>By default, divs stack on top of each other (like blocks). To put them side-by-side, we use <strong>Flexbox</strong>.</p>
          <pre><code class="language-css">.container {
  display: flex;
  gap: 10px;
}</code></pre>
          <p>Just adding <code>display: flex</code> to a parent div makes its children sit in a row!</p>
        `,
        initialHTML: "<div class='container'>\n  <div class='card'>Card 1</div>\n  <div class='card'>Card 2</div>\n  <div class='card'>Card 3</div>\n</div>",
        initialCSS: ".card {\n  background: #334155;\n  padding: 20px;\n  border: 1px solid #475569;\n}\n\n/* Add display: flex to the container below */\n.container {\n  \n}",
        initialJS: "",
        activityGoal: "Use 'display: flex' on the container class to make the cards sit side-by-side."
      },
      {
        id: "w2-l2",
        title: "Hello JavaScript",
        description: "Breathing life into your website. Make it think, react, and move.",
        content: `
          <h2>1. The Brains of the Operation</h2>
          <p>HTML is the skeleton. CSS is the skin. <strong>JavaScript is the brain.</strong></p>
          <p>JS allows you to change the HTML and CSS <em>after</em> the page has loaded, usually when the user does something (like clicking).</p>

          <hr />

          <h2>2. Variables: Memory Boxes</h2>
          <p>A variable is a container for storing data values. We use <code>const</code> (constant) or <code>let</code> (changeable).</p>
          <pre><code class="language-js">let score = 0;
const playerName = "Alex";</code></pre>

          <hr />

          <h2>3. Functions: Recipes</h2>
          <p>A function is a block of code designed to perform a particular task. It's like a recipe you can use over and over.</p>
          <pre><code class="language-js">function sayHello() {
  alert("Hello World!");
}</code></pre>

          <hr />

          <h2>4. Event Listeners: The Ears</h2>
          <p>We need to tell the computer to "listen" for a click. We use <code>addEventListener</code>.</p>
          <pre><code class="language-js">const btn = document.querySelector('button');
btn.addEventListener('click', () => {
  // Code to run when clicked
  alert("You clicked me!");
});</code></pre>
        `,
        initialHTML: "<button id='magicBtn'>Do Magic</button>\n<p id='output'>I am waiting...</p>",
        initialCSS: "button { padding: 10px 20px; font-size: 16px; cursor: pointer; }",
        initialJS: "// 1. Select the button\nconst btn = document.querySelector('#magicBtn');\nconst txt = document.querySelector('#output');\n\n// 2. Add listener\nbtn.addEventListener('click', () => {\n  txt.innerText = 'ABRACADABRA! 🐰';\n  txt.style.color = 'violet';\n});",
        activityGoal: "Make the button change the text color and message when clicked."
      }
    ]
  },
  {
    id: 3,
    title: "Week 3: DOM & Publishing",
    color: "from-green-500 to-emerald-400",
    topics: ["DOM Basics", "Website Publishing"],
    objectives: ["Modify HTML via JS", "Understand hosting (GitHub Pages)"],
    lessons: [
      {
        id: "w3-l1",
        title: "DOM Manipulation",
        description: "Mastering the Document Object Model to control every pixel on the screen dynamically.",
        content: `
          <h2>1. What is the DOM?</h2>
          <p>The <strong>Document Object Model</strong> is a tree-like representation of your HTML. JavaScript sees your page as a giant object called <code>document</code>.</p>
          
          <hr />

          <h2>2. Selecting Elements</h2>
          <p>Before you change something, you must find it.</p>
          <ul>
            <li><code>document.getElementById('id')</code>: Fast, specific.</li>
            <li><code>document.querySelector('.class')</code>: Flexible, finds the first match.</li>
            <li><code>document.querySelectorAll('p')</code>: Finds ALL paragraphs.</li>
          </ul>

          <hr />

          <h2>3. Manipulating Content</h2>
          <p>Once you have an element, you can change it.</p>
          <pre><code class="language-js">const heading = document.querySelector('h1');
heading.innerText = "New Title!"; // Changes text
heading.innerHTML = "<em>Italic</em> Title"; // Parses HTML tags</code></pre>

          <hr />

          <h2>4. Manipulating Style</h2>
          <p>You can access CSS via the <code>.style</code> property. Note that property names use camelCase (e.g., <code>backgroundColor</code> instead of <code>background-color</code>).</p>
          <pre><code class="language-js">element.style.color = "red";
element.style.marginTop = "20px";</code></pre>
        `,
        initialHTML: "<div id='box'>I am a box</div>\n<button id='grow'>Grow</button>\n<button id='shrink'>Shrink</button>",
        initialCSS: "#box { width: 100px; height: 100px; background: orange; transition: all 0.3s; }",
        initialJS: "const box = document.getElementById('box');\nconst growBtn = document.getElementById('grow');\nconst shrinkBtn = document.getElementById('shrink');\n\ngrowBtn.addEventListener('click', () => {\n  box.style.width = '200px';\n});\n\n// Can you make the shrink button work?\nshrinkBtn.addEventListener('click', () => {\n  \n});",
        activityGoal: "Implement the shrink button logic to make the box 50px wide."
      }
    ]
  },
  {
    id: 4,
    title: "Week 4: The Project",
    color: "from-orange-500 to-yellow-400",
    topics: ["Mini Project: School Website", "Presentation"],
    objectives: ["Combine HTML, CSS, JS", "Present projects"],
    lessons: [
      {
        id: "w4-l1",
        title: "Final Project Builder",
        description: "The capstone project. Build a functional, styled website for a fictional school or club.",
        content: `
          <h2>1. Planning Phase</h2>
          <p>Don't just start coding! Professional developers plan first.</p>
          <ul>
            <li><strong>Topic:</strong> What school/club is this for?</li>
            <li><strong>Colors:</strong> Pick 3 colors (Primary, Secondary, Background).</li>
            <li><strong>Structure:</strong> Draw a quick sketch (Header, Hero, Content, Footer).</li>
          </ul>

          <hr />

          <h2>2. HTML Structure (The Skeleton)</h2>
          <p>Start with semantic HTML tags:</p>
          <pre><code class="language-html">&lt;header&gt;...&lt;/header&gt;
&lt;main&gt;
  &lt;section class="hero"&gt;...&lt;/section&gt;
  &lt;section class="about"&gt;...&lt;/section&gt;
&lt;/main&gt;
&lt;footer&gt;...&lt;/footer&gt;</code></pre>

          <hr />

          <h2>3. CSS Styling (The Skin)</h2>
          <p>Apply your colors and fonts. Use Flexbox for your navigation bar to make links sit side-by-side. Use <code>text-align: center</code> for your hero section.</p>

          <hr />

          <h2>4. JS Interactivity (The Brain)</h2>
          <p>Add at least one interactive element. Ideas:</p>
          <ul>
            <li>A "Dark Mode" toggle button.</li>
            <li>A "Contact Us" button that shows an alert saying "Message Sent!".</li>
            <li>An image gallery that changes the image when clicked.</li>
          </ul>
        `,
        initialHTML: "<nav>\n  <div class='logo'>SchoolLogo</div>\n  <div class='links'>\n    <a href='#'>Home</a>\n    <a href='#'>About</a>\n  </div>\n</nav>\n<section class='hero'>\n  <h1>Welcome Future Coders</h1>\n  <button id='cta'>Join Now</button>\n</section>",
        initialCSS: "nav {\n  display: flex;\n  justify-content: space-between;\n  padding: 20px;\n  background: #1e293b;\n}\n\n.hero {\n  text-align: center;\n  padding: 50px;\n}\n\nh1 { font-size: 3rem; margin-bottom: 20px; }",
        initialJS: "const btn = document.getElementById('cta');\nbtn.addEventListener('click', () => {\n  const name = prompt('What is your name?');\n  if(name) {\n    alert('Welcome to the school, ' + name + '!');\n  }\n});",
        activityGoal: "Complete the hero section and add a footer."
      }
    ]
  }
];
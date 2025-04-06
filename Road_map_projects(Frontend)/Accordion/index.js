accordion_data = [
    {
    question: "What is roadmap.sh?",
    answer: "Roadmap.sh is a community effort to create learning paths, guides, project ideas and other similar content to help developers grow in their careers."
},
    {
    question: "What are the plans for roadmap.sh",
    answer: "Roadmap.sh plans to become the go-to platform for developers to learn new skills and guide their careers. The community-driven project aims to expand its interactive roadmaps, guides, and educational content to help developers grow professionally."
},
    {
        question: "How is roadmap.sh built",
        answer: "Roadmap.sh is built using a combination of technologies and tools.<br>Frontend: React,TypeScript and Material-UI<br>Backend: Node.js, Express.js, GrahQL, Prisma<br>Database: PostgreSQL, Graphile "
},
    {
        question: "Can I use roadmap.sh in my team?",
        answer: "You can definitely use roadmap.sh in your team. In fact, roadmap.sh offers a range of features specifically designed for teams including: Onboarding plans, Team insights, Skill gap analysis, Custom roadmaps and Progress tracking."
},
    {
    question: "How can I create custom roadmaps?",
    answer: "Steps:<br>1. Sign in to Roadmap.sh.<br>2.Access the Roadmap Editor.<br>3. Choose a Template or Start from Scratch.<br>4. Add stages and steps.<br>5. Configure Roadmap settings.<br>6. Add resources and links.<br>7. Review and Publish"
},
    {
    question: "Is roadmap.sh really 7th most starred project on Github? ",
    answer: "Roadmap.sh claims to be the 7th most starred project on Github, with over 312,000 stars and 28 million repositories."
},
] 

let accordion_html = ``;

accordion_data.forEach((element, index) => {
    accordion_html += `
    <div class="questions">
        <h3>${element.question}</h3>
        <span class="dropdown">
            <img src="expand-arrow.png" class="expand_image" data-index="${index}">
        </span>
    </div>
    <div class="answer_section">
        <span class="answers" style="display: none;">${element.answer}</span>
    </div>
    `;
});

document.querySelector(".accordions").innerHTML = accordion_html;

document.querySelectorAll(".expand_image").forEach((img) => {
    img.addEventListener("click", () => {
        let answerSections = document.querySelectorAll(".answers");

        // Find the correct answer section related to the clicked image
        let answerSection = img.closest(".questions").nextElementSibling.querySelector(".answers");

        // Close all other answer sections
        answerSections.forEach((section) => {
            if (section !== answerSection) {
                section.style.display = "none";
            }
        });

        // Toggle the clicked one
        if (answerSection.style.display === "none") {
            answerSection.style.display = "block";
            img.style.transform= "rotateX(180deg)";
        } else {
            answerSection.style.display = "none";
            img.style.transform= "rotateX(0deg)";
        }
    });
});
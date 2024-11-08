// Event listener for form submission
document.getElementById('resume-form')!.addEventListener('submit', function (event: Event) {
    event.preventDefault();

    // Get form input elements
    const profilePicInput = <HTMLInputElement>document.getElementById('profile-pic');
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const phone = (<HTMLInputElement>document.getElementById('phone')).value;
    const education = (<HTMLInputElement>document.getElementById('education')).value;
    const field = (<HTMLInputElement>document.getElementById('field')).value;
    const experience = (<HTMLInputElement>document.getElementById('experience')).value;
    const skills = (<HTMLInputElement>document.getElementById('skills')).value;

    // Profile Picture Handling
    let profilePicURL: string = '';
    const profilePic = profilePicInput?.files ? profilePicInput.files[0] : null;
    if (profilePic) {
        profilePicURL = URL.createObjectURL(profilePic); // Creates a local URL for the uploaded image
    }

    // Save form data in localStorage with the username as the key
    const resumeData = {
        username: username,
        email: email,
        phone: phone,
        education: education,
        field: field,
        experience: experience,
        skills: skills,
        profilePicURL: profilePicURL // Save the profile picture URL
    };

    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

    // Generate the resume content dynamically
    const resumeHTML = `
        ${profilePicURL ? `<img src="${profilePicURL}" alt="Profile Picture" class="profile-pic">` : ''}
        <p><b>Name:</b> <span contenteditable="true">${username}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>

        <h3>Education</h3>
        <p contenteditable="true">${education}</p>

        <h3>Field of Study</h3>
        <p contenteditable="true">${field}</p>

        <h3>Experience</h3>
        <p contenteditable="true">${experience}</p>

        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>
    `;

    // Display the generated resume
    const resumeDisplay = document.getElementById('resume-display')!;
    resumeDisplay.innerHTML = resumeHTML;
    resumeDisplay.style.display = 'block';

    // Generate a shareable URL with the username only
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

    // Display the shareable link
    const shareableLinkContainer = document.getElementById('shareable-link-container')!;
    shareableLinkContainer.style.display = 'block';

    const shareableLink = document.getElementById('shareable-link') as HTMLAnchorElement;
    shareableLink.href = shareableURL;
    shareableLink.textContent = shareableURL;
});

// Handle PDF download
document.getElementById('download-pdf')!.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

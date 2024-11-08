document.getElementById('resume-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var profilePicInput = document.getElementById('profile-pic');
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var field = document.getElementById('field').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;

    // Profile Picture Handling
    var profilePic = profilePicInput.files[0];
    var profilePicURL = '';
    if (profilePic) {
        profilePicURL = URL.createObjectURL(profilePic); // Creates a local URL for the uploaded image
    }

    // Save form data in localStorage with the username as the key
    var resumeData = {
        username:username,
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
    var resumeHTML = `
        
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
    document.getElementById('resume-display').innerHTML = resumeHTML;
    document.getElementById('resume-display').style.display = 'block';

    // Generate a shareable URL with the username only
    var shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

    // Display the shareable link
    document.getElementById('shareable-link-container').style.display = 'block';
    document.getElementById('shareable-link').href = shareableURL;
    document.getElementById('shareable-link').textContent = shareableURL;
});

// Handle PDF download
document.getElementById('download-pdf').addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

/**
 * Language-specific character names for AI Story Generator
 * This module provides character names for different languages
 */

// Add these names to the StoryGenerator class
const tamilNames = [
    'Arjun', 'Priya', 'Karthik', 'Divya', 'Vijay', 'Kavitha', 'Rajan', 'Lakshmi', 'Surya', 'Meena',
    'Ganesh', 'Anitha', 'Kumar', 'Deepa', 'Ramesh', 'Saranya', 'Prakash', 'Sangeetha', 'Senthil', 'Revathi',
    'Arun', 'Seetha', 'Bala', 'Vani', 'Chandran', 'Geetha', 'Dinesh', 'Kala', 'Ezhil', 'Jaya',
    'Gopal', 'Nithya', 'Hari', 'Padma', 'Iyappan', 'Radha', 'Jagan', 'Shanthi', 'Kannan', 'Thenmozhi'
];

const teluguNames = [
    'Ravi', 'Sita', 'Krishna', 'Lakshmi', 'Venkat', 'Padma', 'Suresh', 'Anitha', 'Prasad', 'Sunitha',
    'Naresh', 'Kavitha', 'Ramesh', 'Lalitha', 'Mahesh', 'Radha', 'Ganesh', 'Sarada', 'Rajesh', 'Usha',
    'Srinivas', 'Aruna', 'Venu', 'Bhavani', 'Anil', 'Durga', 'Chandra', 'Geetha', 'Deepak', 'Jyothi',
    'Kiran', 'Madhavi', 'Mohan', 'Nirmala', 'Pavan', 'Priya', 'Raju', 'Sarala', 'Satish', 'Vani'
];

// Add Tamil and Telugu names to the StoryGenerator
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the StoryGenerator to be initialized
    setTimeout(() => {
        if (window.storyGenerator && window.storyGenerator.nameOptionsByLanguage) {
            // Add Tamil names
            window.storyGenerator.nameOptionsByLanguage.tamil = tamilNames;
            
            // Add Telugu names
            window.storyGenerator.nameOptionsByLanguage.telugu = teluguNames;
            
            console.log('Tamil and Telugu names added to StoryGenerator');
        }
    }, 500);
});
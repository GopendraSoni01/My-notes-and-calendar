// Initialize Flatpickr
flatpickr("#calendar", {
  dateFormat: "Y-m-d",
  onChange: function(selectedDates, dateStr, instance) {
      showEventForm(dateStr);
  }
});

// Update date and time every second
function updateDateTime() {
  const now = new Date();
  const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
  };
  document.getElementById('date-time').textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call to display the date and time immediately

const textarea = document.getElementById('note-text');
const addButton = document.getElementById('add-btn');
const notesContainer = document.getElementById('notes-container');
const eventForm = document.getElementById('event-form');
const saveEventButton = document.getElementById('save-event-btn');
const eventsContainer = document.getElementById('events-container');
const eventTitleInput = document.getElementById('event-title');
const eventDescriptionInput = document.getElementById('event-description');

// Auto-resize the textarea based on its content
textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Reset the height
  this.style.height = this.scrollHeight + 'px'; // Set the height to the scroll height
});

// Add note functionality
addButton.addEventListener('click', function() {
  const noteText = textarea.value.trim();
  if (noteText) {
      // Create note card
      const noteCard = document.createElement('div');
      noteCard.className = 'note-card';

      const noteContent = document.createElement('p');
      noteContent.textContent = noteText;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = function() {
          if (confirm('Are you sure you want to delete this note?')) {
              notesContainer.removeChild(noteCard);
          }
      };

      noteCard.appendChild(noteContent);
      noteCard.appendChild(deleteBtn);
      notesContainer.appendChild(noteCard);

      // Clear textarea
      textarea.value = '';
      // Show alert
      alert('Note added successfully!');
  } else {
      alert('Please enter a note!');
  }
});

// Show event form
function showEventForm(dateStr) {
  eventForm.style.display = 'block';
  eventForm.dataset.date = dateStr;
}

// Save event functionality
saveEventButton.addEventListener('click', function() {
  const title = eventTitleInput.value.trim();
  const description = eventDescriptionInput.value.trim();
  const dateStr = eventForm.dataset.date;

  if (title && description) {
      // Create event card
      const eventCard = document.createElement('div');
      eventCard.className = 'event-card';

      const eventContent = document.createElement('p');
      eventContent.innerHTML = `<strong>${title}</strong><br>${description}<br><em>${dateStr}</em>`;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = function() {
          if (confirm('Are you sure you want to delete this event?')) {
              eventsContainer.removeChild(eventCard);
          }
      };

      eventCard.appendChild(eventContent);
      eventCard.appendChild(deleteBtn);
      eventsContainer.appendChild(eventCard);

      // Clear event form
      eventTitleInput.value = '';
      eventDescriptionInput.value = '';
      eventForm.style.display = 'none';
      // Show alert
      alert('Event added successfully!');
  } else {
      alert('Please fill out all fields!');
  }
});

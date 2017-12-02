$(() => {
  $('#user-tab').on('shown.bs.tab', () => {
    const id = $('a.nav-link.tab-custom.active').attr('data-id');

    if (id === '1') {
      $('#user-add').attr('data-target', '#addEvent');
      $('#user-add').attr('title', 'New Event');
    } else {
      $('#user-add').attr('data-target', '#addCenter');
      $('#user-add').attr('title', 'New Center');
    }
  });
});

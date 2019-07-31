 // SideNav Initialization
 $(".button-collapse").sideNav();
 // TimePicker Initialization
 $('.timepicker').pickatime({ default: '', cleartext: 'cancelar', donetext: "listo" });
 $('.datepicker').pickadate();
 $('#rruleCheck').change(function(e) {
     if ($('#rrule').is(":visible")) {
         $('#rrule').css('display', 'none');
     } else {
         $('#rrule').css('display', 'block');
     }
 });

 $('[data-toggle="popover-hover"]').popover({
     html: true,
     trigger: 'hover',
     placement: 'right',
     content: function() { return $(this).data('text'); }
 });

 /* token Show */
 $(document).ready(function() {
     tokenShow();
 });

 // Material Design example
 $(document).ready(function() {
     $('#dtMaterialDesignExample').DataTable();
     $('#dtMaterialDesignExample_wrapper').find('label').each(function() {
         $(this).parent().append($(this).children());
     });
     $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('input').each(function() {
         $('input').attr("placeholder", "Search");
         $('input').removeClass('form-control-sm');
     });
     $('#dtMaterialDesignExample_wrapper .dataTables_length').addClass('d-flex flex-row');
     $('#dtMaterialDesignExample_wrapper .dataTables_filter').addClass('md-form');
     $('#dtMaterialDesignExample_wrapper select').removeClass(
         'custom-select custom-select-sm form-control form-control-sm');
     $('#dtMaterialDesignExample_wrapper select').addClass('mdb-select');
     $('#dtMaterialDesignExample_wrapper .mdb-select').materialSelect();
     $('#dtMaterialDesignExample_wrapper .dataTables_filter').find('label').remove();
 });

 $('#deleteAlertModal').on('show.bs.modal', function(event) {
     var button = $(event.relatedTarget)
     var action = button.data('action');
     var name = button.data('name');
     var modal = $(this);
     modal.find('.modal-title').text('Eliminar ' + name);
     modal.find('.text-danger').text("Está a punto de eliminar a | " + name + " | por favor confirme su selección.");
     modal.find('#deleteForm').attr('action', action);
 });

 // will hold the local preview url
 var _PREVIEW_URL;



 // Material Select Initialization
 $(document).ready(function() {
     $('.mdb-select').materialSelect();
 });

 // Ajax Requests
 function requests(url, form, div) {

     $.ajax({
         data: $(form).serialize(),
         type: "POST",
         url: url,
         success: function(data) {
             update(div, data)
         },
         fail: function(err) {
             alert(err);
             console.log(err);
         }
     });
 };



 function tokenShow() {
     $.ajax({
         data: { 'brand': $('#brandId').val() },
         type: "POST",
         url: '/brands/token/show',
         success: function(data) {
             if (!data.status) {
                 $('#tokenTrue').hide();
                 $('#tokenFalse').show();
             } else {
                 $('#tokenFalse').hide();
                 var el = $('#windowOpener');
                 el.attr('href', "javascript:window.open('/check/" + data.data._id + "/" + data.data.brand + "','','toolbar=yes');void 0")
                 $('#tokenTrue').show();
             }
         },
         fail: function(err) { console.log(err) }
     });
 };

 //token Create

 $('#crearToken').on('click', function() {
     var token = prompt('Ingrese una palabra cualquiera, la cual funcionar? como clave para generar el token.');
     if (token) {
         $.ajax({
             data: $('#newTokenCreate').serialize(),
             type: "POST",
             url: '/brands/token/generate',
             success: function(data) {
                 tokenShow();
             },
             fail: function(err) {
                 tokenShow();
                 alert(err);
                 console.log(err);
             }
         });
     }
 });


 // token Area change

 function update(div, data) {
     var string = "<div class=\"text-center\"><p class=\"card-text\"> El registro de fichaje solo funcionar? a trav?s del siguiente <a href=\"javascript:window.open('https://horacloud.herokuapp.com/DATA','','toolbar=yes');void 0\" target=\"_blank\">link</a> luego de haber generado el token de seguridad.</p><a href=\"javascript:window.open('https://horacloud.herokuapp.com/DATA','','toolbar=yes');void 0\"  target=\"_blank\" class=\"btn btn-outline-default btn-rounded waves-effect\">Nueva ventana de Fichaje</a></div>";
     string = string.split('DATA').join(data);
     $(div).html(string);
 };

 /* calendar */

 document.addEventListener('DOMContentLoaded', function() {
     var calendarEl = document.getElementById('calendar');
     var employee = $('#employeeId').val();

     var calendar = new FullCalendar.Calendar(calendarEl, {
         plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'rrule', 'bootstrap'],
         locale: 'es-us',
         themeSystem: 'bootstrap',
         header: {
             left: 'prev,next today',
             center: 'title',
             right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
         },
         defaultDate: Date.now(),
         // businessHours: true,
         editable: true,
         selectable: true,
         weekNumbers: true,
         weekNumbersWithinDays: true,
         weekNumberCalculation: 'ISO',
         selectMirror: true,
         /* eventPositioned:function(event){
           console.log(event);
         }, */
         eventDragStop: function(event, jsEvent, ui, view) {
             console.log(event);
             $.ajax({
                 data: {
                     "id": event.event.id,

                     "_method": "DELETE"
                 },
                 type: "POST",
                 url: "/employees/calendar/move",
                 success: function(data) {
                     event.event.remove();
                 },
                 fail: function(err) {
                     alert(err);
                     console.log(err);
                 }
             });
             console.log(event.event.id);

         },
         select: function(arg) {
             var mod = $('#CalendarEvents');
             mod.find('#CalendarEventsTitle').text('Crear evento al: ' + arg.startStr);
             mod.find('#start').val(arg.start);
             mod.find('#dtstart').val(arg.startStr)
             mod.modal('show');
             mod.find('#eventForm-btn').click(function() {
                 $.ajax({
                     data: $('#eventForm').serialize(),
                     type: "POST",
                     url: "/employees/calendar/add",
                     success: function(data) {
                         calendar.addEvent(data);
                     },
                     fail: function(err) {
                         alert(err);
                         console.log(err);
                     }
                 });
                 $('#eventForm').trigger('reset');
                 mod.modal('hide');
             });
             calendar.unselect();
         },
         editable: true,
         navLinks: true,
         eventLimit: true,
         events: {
             url: '/employees/calendar/' + employee,
             failure: function() {
                 document.getElementById('script-warning').style.display = 'block'
             }
         },
         eventDoubleClick: function(arg) {
             if (confirm('delete event?')) {
                 arg.event.remove()
             }
         },
     });

     calendar.render();

 });


 /* Employee Shift Show */

 function showShift() {

     $.ajax({
         data: { 'id': $('#employeeId').val() },
         type: "POST",
         url: "/employees/shift",
         success: function(data) {
             if (data.result) {
                 $('#showShiftTrue').show();
                 $('#shiftTitle').text(data.data.description);
                 $('#shiftStart').text(data.data.start);
                 $('#shiftBreakTime').text(data.data.breaktime);
                 $('#shiftDays').text(data.data.days.toString());

                 $('#shiftEnd').text(data.data.end);
                 $('#showShiftFalse').hide();

             } else {
                 data.data.forEach(element => {
                     $('#shiftSelect').append('<option value="' + element._id + '">' + element.name + '</option>');
                 });
                 $('#showShiftFalse').show();
                 $('#showShiftTrue').hide();
             };
         },
         fail: function(err) {
             alert(err);
             console.log(err);
         }
     });
 };

 /* shift Change */

 $('#shiftChange').on('click', function(e) {

     e.preventDefault();

     var confirm = prompt('Escriba "desactivar" para confirmar');

     if (confirm == 'desactivar') {
         $.ajax({
             data: { 'id': $('#employeeId').val() },
             type: "POST",
             url: "/employees/shift/deactivate",
             success: function(data) {
                 if (data.result) {
                     $('#showShiftTrue').hide();
                     data.data.forEach(element => {
                         $('#shiftSelect').append('<option value="' + element._id + '">' + element.name + '</option>');
                     });
                     $('#showShiftFalse').show();

                 } else {

                     $('#showShiftFalse').hide();
                     $('#showShiftTrue').show();
                 };
             },
             fail: function(err) {
                 alert(err);
                 console.log(err);
             }
         });
     }
 });

 /* Employee Shift */
 function addShift() {
     var mod = $('#EmployeeShift');
     mod.modal('show');
     mod.find('#shiftForm-btn').click(function() {
         $.ajax({
             data: $('#shiftForm').serialize(),
             type: "POST",
             url: "/employees/shift/add",
             success: function(data) {
                 calendar.refetchEvents();
             },
             fail: function(err) {
                 alert(err);
                 console.log(err);
             }
         });
         $('#shiftForm').trigger('reset');
         mod.modal('hide');
     });
 };




 /* Show Select File dialog */
 document.querySelector("#upload-dialog").addEventListener('click', function() {
     document.querySelector("#image-file").click();
 });

 /* Selected File has changed */
 document.querySelector("#image-file").addEventListener('change', function() {
     // user selected file
     var file = this.files[0];

     // allowed MIME types
     var mime_types = ['image/jpeg', 'image/png'];

     // validate MIME
     if (mime_types.indexOf(file.type) == -1) {
         alert('Error : Incorrect file type');
         return;
     }

     // validate file size
     if (file.size > 2 * 1024 * 1024) {
         alert('Error : Exceeded size 2MB');
         return;
     }

     // object url
     _PREVIEW_URL = URL.createObjectURL(file);

     // set src of image and show
     document.querySelector("#preview-image").setAttribute('src', _PREVIEW_URL);
     document.querySelector("#preview-image").style.display = 'inline-block';
 });
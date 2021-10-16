
$('#getProducts').on('click', () => {
    $.ajax({
        url: '/products',
        success: function(products){
            let tbody = $('tbody');
            tbody.html(''),
            products.forEach(n => {
                tbody.append(`
                    <tr>
                        <td class="id">${n.id}</td>
                        <td><input type="text" class="name" value="${n.name}"></td>
                        <td>
                            <button class="update-button" id="${n.id}">Update</button>
                            <button class="delete-button">Delete</button>
                        </td>
                    </tr>
                `);
            });
        }
    })
})

$('#form').on('submit', (e) => {
    e.preventDefault();
    let newProduct = $('#newpProduct');
    $.ajax({
        url:'products',
        method: 'POST',
        data: {
            name: newProduct.val()
        },
        success: function (r) {
            $('#getProducts').click();
        }
    })
});

$('table').on('click', '.update-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let name = row.find('.name').val();
    $.ajax({
        url: `/products/${id}`,
        method: 'PUT',
        data: {
            name
        },
        success: function (r) {
            $('#getProducts').click();
        }
    })
});

$('table').on('click', '.delete-button', function() {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    $.ajax({
        url: `/products/${id}`,
        method: 'DELETE',
        success: function (r) {
            $('#getProducts').click();
        }
    })
});

$('#getProducts').click();

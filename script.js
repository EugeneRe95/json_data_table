fetch('./data/data.json')
    .then(res => res.json())
    .then(data => {

        const filterByDay = document.querySelector("#filter-day");
        const filterByMonth = document.querySelector("#filter-month");
        const filterBtn = $("#filter-btn");
        const container = $('.table-container')


        // Filter function by day
        function filterDay() {
            const tableBody = $("table tbody");
            data.forEach(item => {
                if (filterByDay.value == new Date(item.birthday_contact).getDate()) {
                    const el = `
            <tr>
            <td>${item.firstname}</td>
            <td>${item.lastname}</td>
            <td>${item.email}</td>
            <td>${item.phonenumber}</td>
            <td>${item.birthday_contact}</td>
            <td>${item.company}</td>
            </tr>`
                    tableBody.append(el)
                }
            })
        }
        // Filter function by month
        function filterMonth() {
            const tableBody = $("table tbody");
            data.forEach(item => {
                if (filterByMonth.value == (new Date(item.birthday_contact).getMonth() + 1)) {
                    const el = `
            <tr>
            <td>${item.firstname}</td>
            <td>${item.lastname}</td>
            <td>${item.email}</td>
            <td>${item.phonenumber}</td>
            <td>${item.birthday_contact}</td>
            <td>${item.company}</td>
            </tr>`
            tableBody.append(el)
                }
            })
        }

        //General filter function
        function filter() {
            container.empty()
            container.append(`
            <table>
            <thead>
                <tr>
                    <td>First name</td>
                    <td>Last name</td>
                    <td>Email</td>
                    <td>Phone number</td>
                    <td>Birthday</td>
                    <td>Company</td>
                </tr>
            </thead>
            <tbody></tbody>
            </table>
            `)
            const tableBody = $("table tbody");
            tableBody.empty()
            if (filterByDay.value == 'All' && filterByMonth.value == 'All') {
                data.forEach(item => {
                    const el = `
            <tr>
            <td>${item.firstname}</td>
            <td>${item.lastname}</td>
            <td>${item.email}</td>
            <td>${item.phonenumber}</td>
            <td>${item.birthday_contact}</td>
            <td>${item.company}</td>
            </tr>`
            tableBody.append(el)
                });
            } else if (filterByDay.value !== 'All' && filterByMonth.value == 'All') {
                filterDay()

            } else if (filterByDay.value == 'All' && filterByMonth.value !== 'All') {
                filterMonth()
            } else {
                data.forEach(item => {
                    if (filterByDay.value == new Date(item.birthday_contact).getDate() && filterByMonth.value == (new Date(item.birthday_contact).getMonth() + 1)) {
                        const el = `
                <tr>
                <td>${item.firstname}</td>
                <td>${item.lastname}</td>
                <td>${item.email}</td>
                <td>${item.phonenumber}</td>
                <td>${item.birthday_contact}</td>
                <td>${item.company}</td>
                </tr>`
                tableBody.append(el)
                    }
                })
            }

            // Warning to frist task
            // if (tableBody.html() === '') {
            //     const el = `
            //     <tr>
            //     <td></td>
            //     <td></td>
            //     <td></td>
            //     <td></td>
            //     <td></td>
            //     <td></td>
            //     </tr>`
            //     tableBody.append(el)
            //     alert('Данные остутствуют')
            // }

            //Task 2
            $('.table-container table').DataTable();
        }

        // Event listener for filter button
        filterBtn.on('click', () => {
            filter();
        })

        //Fetching table according to selected options after page loading
        filter();
    })
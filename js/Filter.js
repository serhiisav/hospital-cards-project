export default class Filter {
    constructor(root) {
        this.root = root;
    }

    createFilterForm() {
        let container = document.createElement('div');
        container.id = 'filterWrapId';
        container.className = 'container border rounded py-2 my-3 bg-light mx-auto justify-content-md-center';

        let filterForm = document.createElement('form');
        filterForm.id = 'form-filter';
        filterForm.className = 'row justify-content-md-center';

        this.createInputFilterForm(filterForm);

        this.createSelectFilterForm(filterForm, 'status', ['All', 'Open', 'Done']);
        this.createSelectFilterForm(filterForm, 'urgency', ['All', 'High', 'Medium', 'Low']);
        this.createButtonFilterForm(filterForm);

        container.prepend(filterForm);
        this.root.prepend(container);
    }

    createInputFilterForm(filterForm) {
        let wrapTitleFilter = document.createElement('div');
        wrapTitleFilter.className = 'mb-2 col-md-4 align-self-end';

        let label = document.createElement('label');
        label.setAttribute('for', 'input-title-filter-id');
        label.className = 'form-label';
        label.textContent = 'Search by title / description';

        let input = document.createElement('input');
        input.id = 'input-title-filter-id';
        input.className = 'form-control';
        input.setAttribute('type', 'text');

        wrapTitleFilter.append(label, input);
        filterForm.append(wrapTitleFilter);
    }

    createSelectFilterForm(filterForm, selectName, options) {
        let selectWrap = document.createElement('div');
        selectWrap.className = 'mb-2 col-md-3 align-self-end';

        let label = document.createElement('label');
        label.setAttribute('for', `${selectName}-filter-id`);
        label.className = 'form-label';
        label.textContent = `Select ${selectName}`;

        let select = document.createElement('select');
        select.id = `${selectName}-filter-id`;
        select.className = 'form-select';
        select.setAttribute('aria-label', `select-${selectName}`);

        this.createSelectOptions(options, select);

        selectWrap.append(label, select);
        filterForm.append(selectWrap);
    }

    createSelectOptions(options, select) {
        options.forEach((elValue) => {
            let option = document.createElement('option');
            option.value = elValue.toLowerCase();
            option.textContent = elValue;
            select.append(option);

            if (elValue === 'All') option.selected = true;
        });
    }

    createButtonFilterForm(filterForm) {
        let btnWrap = document.createElement('div');
        btnWrap.className = 'my-2 col-md-2 d-flex flex-md-column justify-content-between align-items-start';

        let buttonReset = document.createElement('a');
        buttonReset.setAttribute('href', '#')
        buttonReset.id = 'button-reset-form-id';
        buttonReset.className = 'mb-2 bi bi-arrow-clockwise text-decoration-none';
        buttonReset.textContent = ' Reset';

        let buttonSearch = document.createElement('input');
        buttonSearch.id = 'button-search-form-id';
        buttonSearch.className = 'btn btn-primary px-4';
        buttonSearch.type = 'submit';
        buttonSearch.value = 'Search';

        btnWrap.append(buttonReset, buttonSearch);
        filterForm.append(btnWrap);

        buttonSearch.addEventListener('click', (e) => {
            e.preventDefault();
            if (localStorage.getItem('cards')) {
                this.filterData();
            }
        });

        buttonReset.addEventListener('click', (e) => {
            e.preventDefault();
            filterForm.reset();

            if (localStorage.getItem('cards')) {
                this.filterData();
            }
        })

    }

    filterData() {
        let cards = JSON.parse(localStorage.getItem('cards'));

        let inputTitle = document.getElementById('input-title-filter-id');
        let selectStatus = document.getElementById('status-filter-id');
        let selectUrgency = document.getElementById('urgency-filter-id');

        let resultsFilter = [];

        cards.forEach((card) => {
            let statusVisit = this.getStatus(card.appointmentDate);
            let hiddenCard = document.getElementById(`${card.id}`);

            let titleCard = card.purpose.toLowerCase();
            let descriptionCard = card.shortDesc.toLowerCase();

            let inputForm = inputTitle.value.toLowerCase();

            if ((
                titleCard.indexOf(inputForm) < 0 &&
                descriptionCard.indexOf(inputForm) < 0 ||
                statusVisit !== selectStatus.value &&
                selectStatus.value !== 'all' ||
                card.urgency.toLowerCase() !== selectUrgency.value &&
                selectUrgency.value !== 'all'
            )) {
                hiddenCard.hidden = true;
            } else {
                if (hiddenCard.hidden) {
                    hiddenCard.hidden = !hiddenCard.hidden;
                }
                resultsFilter.push(card);
            }
        });

        let filterInfoEl = document.getElementById('result-filter-id');

        if (resultsFilter.length <= 0) {
            if (!filterInfoEl) this.createfilterInfo();
        } else if (filterInfoEl) filterInfoEl.remove();

    }
    getStatus(appointmentDate) {
        let currentDate = new Date();
        let cardDate = new Date(appointmentDate);

        if ((cardDate - currentDate.setUTCHours(0, 0, 0, 0)) < 0) {
            return 'done';
        } else return 'open';
    }

    createfilterInfo() {
        let filterInfo = document.createElement('p');
        filterInfo.id = 'result-filter-id';
        filterInfo.className = 'container text-secondary';
        filterInfo.textContent = 'No results found';
        this.root.append(filterInfo);
    }

}

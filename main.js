// const e = require("express");

let currentPageCharacter = 1;
let currentPageEpisode = 1;
let currentPageLocation = 1;

let totalPageCharacter = 1;
let totalPageEpisode = 1;
let totalPageLocation = 1;

const watchList = [];
let watchEpisodesInfo = [];

let isFilters = false;

$(document).ready(() => {
    $('.page').hide();
    $('#page-home').show();
    $('.pagination').hide();
    $('.filter').css('display', 'none');

    $('a').click(async function (event) {
        event.preventDefault();

        const pageId = $(this).attr('id');
        console.log(pageId);
        $('.page').hide();
        $('#page-' + pageId).show();

        if (pageId === 'character' || pageId === 'episode' || pageId === 'location') {
            $('.pagination').show();
            $('.filter-open').css('display', 'none');
        } else {
            $('.pagination').hide();
            $('.filter-open').css('display', 'none');
        }

        $('.filter').css('display', 'none');

        if (pageId === 'character') {
            $('.filter-character').css('display', 'flex');
            $('.filter-open').css('display', 'inline-block');

            resetPagination()

            isFilters = false;
            addCharactersToPage(currentPageCharacter, getFiltresCharacter());
        } else if (pageId === 'location') {
            $('.filter-location').css('display', 'flex');
            $('.filter-open').css('display', 'inline-block');

            resetPagination()

            isFilters = false;
            addCardsToPage(currentPageLocation, pageId, getCardsFilters('location'));
        } else if (pageId === 'episode') {
            $('.filter-episode').css('display', 'flex');
            $('.filter-open').css('display', 'inline-block');

            resetPagination()

            isFilters = false;
            addCardsToPage(currentPageEpisode, pageId, getCardsFilters('episode'));
        }

    })
    getWatchListEpisodeName();
})

function setUpPagination(currentPage, lastPage, currentFunction, filters, pageName) {
    if (isFilters == true) {
        $('#paginationNext').off('click');
        $('#paginationPrev').off('click');
    }
    console.log(currentPage);
    $('#paginationNext').click(() => {
        if (currentPage < lastPage) {
            console.log(lastPage);
            currentPage++;
            console.log(currentPage);
            if (pageName === 'character') {
                currentFunction(currentPage, filters);
            } else if (pageName === 'episode') {
                currentFunction(currentPage, 'episode', filters);
            } else if (pageName === 'location') {
                currentFunction(currentPage, 'location', filters);
            }
            $('#pageNumber').text(currentPage);
        } else {
            alert("It's last page");
            // currentPage--;
            if (pageName === 'character') {
                currentFunction(currentPage, filters);
            } else if (pageName === 'episode') {
                currentFunction(currentPage, 'episode', filters);
            } else if (pageName === 'location') {
                currentFunction(currentPage, 'location', filters);
            }
            $('#pageNumber').text(currentPage);
            return
        }
    })

    $('#paginationPrev').click(() => {
        console.log('paginationPrev');
        if (currentPage > 1) {
            currentPage--;
            if (pageName === 'character') {
                currentFunction(currentPage, filters);
            } else if (pageName === 'episode') {
                currentFunction(currentPage, 'episode', filters);
            } else if (pageName === 'location') {
                currentFunction(currentPage, 'location', filters);
            }
            $('#pageNumber').text(currentPage);
        } else {
            alert("It's first page");
            return ""
        }
    })
}

function setUpPaginationNew(lastPage, currentFunction, filters, pageName) {
    $('.page-link').off('click');

    const previousPageButton = $('#previousPage');
    const currentPageButton = $('#currentPage');
    const nextPageButton = $('#nextPage');

    if (lastPage > 2){
        currentPageButton.show();
        nextPageButton.show();
    }
    if (lastPage === 2 && lastPage !== -1) {
        nextPageButton.hide();
    } else if (lastPage === 1 && lastPage !== -1){
        currentPageButton.hide();
        nextPageButton.hide();
    }

    $('.page-link').click((event) => {

        const clickedElement = $(event.currentTarget);

        const pageNumber = parseFloat(clickedElement.text());

        callCurrentFunction(pageNumber, currentFunction, filters, pageName)

        if (pageNumber === 1) {
            $('.page-link').removeClass('active')
            previousPageButton.addClass('active');
        } else if (pageNumber > 1 && pageNumber < lastPage) {

            console.log(pageNumber, lastPage);

            previousPageButton.text(pageNumber - 1);
            currentPageButton.text(pageNumber);
            nextPageButton.text(pageNumber + 1);

            $('.page-link').removeClass('active')
            currentPageButton.addClass('active');

        } else if (pageNumber === lastPage) {
            $('.page-link').removeClass('active')
            nextPageButton.addClass('active');
        }
    })

    $('#firstPage').click(() => {
        callCurrentFunction(1, currentFunction, filters, pageName)

        previousPageButton.text(1);
        currentPageButton.text(2);
        nextPageButton.text(3);

        $('.page-link').removeClass('active')
        previousPageButton.addClass('active');
    })

    $('#lastPage').click(() => {
        callCurrentFunction(lastPage, currentFunction, filters, pageName)

        previousPageButton.text(lastPage - 2);
        currentPageButton.text(lastPage - 1);
        nextPageButton.text(lastPage);

        $('.page-link').removeClass('active')
        nextPageButton.addClass('active');
    })
}

function callCurrentFunction(pageNumber, currentFunction, filters, pageName) {
    if (pageName === 'character') {
        currentFunction(pageNumber, filters);
    } else if (pageName === 'episode') {
        currentFunction(pageNumber, 'episode', filters);
    } else if (pageName === 'location') {
        currentFunction(pageNumber, 'location', filters);
    }
}

function resetPagination() {
    $('#previousPage').text(1);
    $('#currentPage').text(2);
    $('#nextPage').text(3);

    $('.page-link').removeClass('active')
    $('#previousPage').addClass('active');
}





async function getPagesAmountAsync(pagesName) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/${pagesName}/?page=1`)
        const data = await response.json();
        console.log(data.info.pages);
        let pageCount = data.info.pages
        return pageCount
    }
    catch (error) {
        console.log(error);
        return [];
    }
}





function getCardsFilters(pageName) {
    isFilters = true;
    if (pageName == 'episode') {
        console.log($('#episodeName').val());
        return {
            name: $('#episodeName').val()
        };
    } else if (pageName == 'location') {
        return {
            name: $('#locationName').val(),
            type: $('#typeLocation').val(),
            dimension: $('#dimensionLocation').val()
        };
    }
}

$('#filterFormEpisode').submit((el) => {
    el.preventDefault();

    console.log(getCardsFilters('episode'));
    addCardsToPage(currentPageEpisode, "episode", getCardsFilters('episode'))
})

$('#filterFormLocation').submit((el) => {
    el.preventDefault();

    console.log(getCardsFilters('location'));
    addCardsToPage(currentPageLocation, "location", getCardsFilters('location'))
})

async function getCardInf(page, pageName, filters) {
    try {
        let response;
        let data;
        if (pageName === 'episode') {
            response = await fetch(`https://rickandmortyapi.com/api/${pageName}/?page=${page}
            &name=${filters.name}`)
            data = await response.json();
            totalPageEpisode = await data.info.pages;
        } else if (pageName === 'location') {
            response = await fetch(`https://rickandmortyapi.com/api/${pageName}/?page=${page}
            &name=${filters.name}
            &type=${filters.type}
            &dimension=${filters.dimension}`)
            data = await response.json();
            totalPageLocation = await data.info.pages;
        }

        // const data = await response.json();
        console.log(data);
        return data.results
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function addCardsToPage(page, pageName, filters) {
    let cards = await getCardInf(page, pageName, filters);
    console.log(cards);
    $(`#page-${pageName}`).empty();
    if (pageName === 'episode') {
        for (const el of cards) {
            $(`#page-${pageName}`).append(`
                <div class="card noto-sans">
                    <h4>Name: ${el.name}</h4>
                    <p>Date: ${el.air_date}</p>
                </div>
            `);
        };
    } else if (pageName === 'location') {
        for (const el of cards) {
            $(`#page-${pageName}`).append(`
                <div class="card reddit-mono">
                    <h4>Name: ${el.name}</h4>
                    <p>Type: ${el.type}</p>
                    <p>Dimension: ${el.dimension}</p>
                </div>
            `);
        };
    }

    console.log(isFilters);
    if (isFilters == true) {
        page = 1;
        $('#pageNumber').text(page);
        if (pageName === 'episode') {
            // setUpPagination(page, totalPageEpisode, addCardsToPage, filters, pageName);
            console.log(totalPageEpisode);
            setUpPaginationNew(totalPageEpisode, addCardsToPage, filters, pageName)
        } else if (pageName === 'location') {
            // setUpPagination(page, totalPageLocation, addCardsToPage, filters, pageName);
            setUpPaginationNew(totalPageLocation, addCardsToPage, filters, pageName)
        }

        isFilters = false;
    }
}

$('#filterFormCharacter').submit((el) => {
    el.preventDefault();

    console.log(getFiltresCharacter());
    addCharactersToPage(currentPageCharacter, getFiltresCharacter())
})

function getFiltresCharacter() {
    isFilters = true;
    return {
        name: $('#nameCharacter').val(),
        status: $('#status').val(),
        species: $('#species').val(),
        type: $('#type').val(),
        gender: $('#gender').val(),
    }
}


async function getCharacters(page, filters) {
    console.log(page);
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}
        &name=${filters.name}
        &status=${filters.status}
        &species=${filters.species}
        &type=${filters.type}
        &gender=${filters.gender}`)
        const data = await response.json();
        totalPageCharacter = data.info.pages
        console.log(data);
        return data.results
    } catch (error) {
        alert("Персонажа з такими фільтрами не існує!")
        // isFilters = false
        console.log(error);
        return [];
    }
}

async function addCharactersToPage(page, filters) {
    try {
        console.log('page=', page);
        const characters = await getCharacters(page, filters);
        // console.log(characters);
        $('#page-character').empty();
        for (const el of characters) {
            $('#page-character').append(`
            <div class="charecterItem tilt-neon">
                <img src="${el.image}" alt="characterPhoto">
                <h3>${el.name}</h3>
                <button class="charecterBtn reddit-mono" id="${el.id}" data-bs-toggle="modal" data-bs-target="#popup">view</button>
            </div>
        `);
        };
        $('.charecterBtn').click(async (el) => {
            await getCharacterById(el.target.id);
        })
        console.log("SET_UP_PAGINATION");
        console.log(isFilters);
        if (isFilters == true) {
            page = 1;
            $('#pageNumber').text(page);
            // setUpPagination(page, totalPageCharacter, addCharactersToPage, getFiltresCharacter(), 'character');
            setUpPaginationNew(totalPageCharacter, addCharactersToPage, getFiltresCharacter(), 'character');
            isFilters = false;
        }
    } catch (error) {
        alert("Персонажа з такими фільтрами не існує!")
    }
}

async function getWatchListEpisodeName() {
    const episodeSelect = $('#watchlist-episode-select');

    try {
        let fetchAllEpisodes = async (page) => {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`)
            const data = await response.json();

            data.results.forEach((episode) => {
                watchEpisodesInfo.push({ id: episode.id, name: episode.name, view: false });

                let option = $('<option>');
                option.val(episode.id);
                option.text(episode.name);
                option.addClass('option')
                episodeSelect.append(option);
            })
            if (data.info.next) {
                fetchAllEpisodes(page + 1);
            }
        }

        fetchAllEpisodes(1)
    } catch (error) {
        console.log(error);
        return [];
    }
}






async function getCharacterById(id) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        console.log(data);
        $('.modal-body').empty();
        // $('.wrap').css('filter', 'blur(10px)')
        console.log("popup is full")
        $('.modal-body').append(
            `
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <h3>${data.name}</h3>
                <img src="${data.image}" alt="${data.name}">
                <p>Status: ${data.status}</p>
                <p>Species: ${data.species}</p>
                <p>Gender: ${data.gender}</p>
                <p>Location: ${data.location.name}</p>
            `
        )
    } catch (error) {
        console.log(error);
        return [];
    }
}





$('#add-episode').click(() => {
    const selectEpisodeId = $('#watchlist-episode-select').val();
    const selectEpisodeName = $('#watchlist-episode-select option:selected').text();

    if (watchList.some(item => item.id === selectEpisodeId)) {
        alert("Цей епізод присутній")
        return
    }

    watchList.push({ id: selectEpisodeId, name: selectEpisodeName, view: false});

    updateWatchList();
    markViewed(watchEpisodesInfo)
    

})


function updateWatchList() {
    markViewed(watchEpisodesInfo)

    const watchListItems = $('.watchlist-items');

    watchListItems.empty();
    // watchList.forEach((el) => {
    //     let watchlistItem = `
    //         <div class="watchlist-item reddit-mono" id="${el.id}">
    //             <p>${el.name}</p>
    //             <div class="watchlist-item__right">
    //                 <div><i class="fa-${el.view === true ? 'solid' : 'regular'} fa-eye"></i></div>
    //                 <div><i class="fas fa-trash delete-episode"></i></div>
    //             </div>
    //         </div>
    //     `;
    //
    //     watchListItems.append(watchlistItem);
    // });

    for (let i = 0; i < watchList.length; i++) {
        let watchlistItem = `
            <div class="watchlist-item reddit-mono" id="${watchList[i].id}">
                <p>${watchList[i].name}</p>
                <div class="watchlist-item__right">
                    <div><i class="fa-${watchEpisodesInfo[i].view === true ? 'solid' : 'regular'} fa-eye"></i></div>
                    <div><i class="fas fa-trash delete-episode"></i></div>
                </div>
            </div>
        `;

        watchListItems.append(watchlistItem);
    };

    // Використовуємо делегування подій для прив'язки обробника події
    watchListItems.off('click', '.delete-episode'); // Спочатку видаляємо попередні прив'язки обробника події
    watchListItems.on('click', '.delete-episode', function () {
        const itemName = $(this).closest('.watchlist-item').find('p').text();
        const indexToRemove = watchList.findIndex(wlItem => wlItem.name === itemName);
        if (indexToRemove != -1) {
            watchList.splice(indexToRemove, 1);
            markViewed(watchEpisodesInfo)
            updateWatchList();
        }
    });

    watchListItems.off('click', '.fa-eye'); // Спочатку видаляємо попередні прив'язки обробника події
    watchListItems.on('click', '.fa-eye', function () {
        const itemId = $(this).closest('.watchlist-item').attr('id');

        const viewIndex = watchList.findIndex(wlItem => wlItem.id === itemId);
        if (viewIndex != -1) {
            if (watchEpisodesInfo[viewIndex].view === false){
                watchEpisodesInfo[viewIndex].view = true;
            } else if(watchEpisodesInfo[viewIndex].view === true){
                watchEpisodesInfo[viewIndex].view = false;
            }
            updateWatchList();
            markViewed(watchEpisodesInfo)

        }
    });
}

function markViewed(info) {
    info.forEach((el)=>{
        if (el.view === true){
            const option = $('.option').filter(function() {
                return $(this).text().trim() === el.name;
            });
            const watchlistItem = $('.watchlist-item').filter(function() {
                return $(this).text().trim() === el.name;
            });

            console.log(watchlistItem)
            console.log(option)
            option.addClass('viewed');
            watchlistItem.addClass('viewed');
        }
    })
    // const option = $('.option').filter(function() {
    //     return $(this).text().trim() === info.name;
    // });
    // const watchlistItem = $('.watchlist-item').filter(function() {
    //     return $(this).text().trim() === info.name;
    // });
    //
    // console.log(watchlistItem)
    // console.log(option)
    // option.addClass('viewed');
    // watchlistItem.addClass('viewed');
}



window.addEventListener('scroll', function () {
    var sections = document.getElementsByClassName('item');
    for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var sectionTop = section.getBoundingClientRect().top;
        var sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight && sectionBottom >= 0) {
            if (!section.classList.contains('animate')) {
                section.classList.add('animate');
            }
        }
    }
});




// function updateWatchList() {
//     const watchListItems = $('.watchlist-items');
//
//     watchListItems.empty();
//     console.log(watchList)
//     watchList.forEach((el) => {
//         let watchlistItem = `
//             <div class="watchlist-item reddit-mono">
//                 <p>${el.name}</p>
//                 <div><i class="fas fa-trash delete-episode"></i></div>
//             </div>
//         `
//
//         watchListItems.append(watchlistItem)
//
//         watchListItems.find('.delete-episode').click(() => {
//             const indexToRemove = watchList.findIndex(wlItem => wlItem.name === el.name);
//             if (indexToRemove != -1) {
//                 console.log(indexToRemove)
//                 watchList.splice(indexToRemove, 1);
//                 updateWatchList();
//             }
//         })
//     })
// }

// async function getEpisodesName() {
//     try {
//         let fetchAllEpisodes = async (page) =>{
//             const response = await fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`)
//             const data = await response.json();
//             data.results.forEach((episode)=>{
//                 let option = $('<option>');
//                 option.val(episode.id);
//                 option.text(episode.name);
//                 episodeSelect.append(option);
//             })
//             if (data.info.next) {
//                 fetchAllEpisodes(page++);
//             }
//         }
//         fetchAllEpisodes(1)
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// }

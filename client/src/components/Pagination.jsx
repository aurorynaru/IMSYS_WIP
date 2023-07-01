import React from 'react'

const Pagination = ({ totalPages, currentPage, setPage }) => {
    const visiblePages = 5
    const range = Math.floor(visiblePages / 2)
    let startPage = Math.max(currentPage - range, 1)
    let endPage = Math.min(startPage + visiblePages - 1, totalPages)

    // Adjust the range if the endPage is too close to the totalPages
    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(endPage - visiblePages + 1, 1)
    }

    const pageNumbers = []
    for (let page = startPage; page <= endPage; page++) {
        pageNumbers.push(page)
    }
    return (
        <div className='mx-auto my-2 flex items-center justify-center'>
            {currentPage != 1 ? (
                <button
                    type='button'
                    className='btn-outline btn-sm join-item btn rounded-br-none rounded-tr-none '
                    onClick={() => setPage(1)}
                >
                    First
                </button>
            ) : null}
            {currentPage > 1 && (
                <button
                    type='button'
                    className='btn-outline btn-sm join-item btn rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-none'
                    onClick={() => setPage(currentPage - 1)}
                >
                    Previous
                </button>
            )}

            <div className='join '>
                {pageNumbers.map((page) => (
                    <input
                        className='btn-outline join-item btn-sm btn rounded-bl-none  rounded-br-none  rounded-tl-none rounded-tr-none'
                        key={page}
                        onClick={() => setPage(page)}
                        type='radio'
                        name='options'
                        aria-label={page}
                    ></input>
                ))}
            </div>
            <div className='join grid w-fit grid-cols-2'>
                {currentPage < totalPages && (
                    <button
                        type='button'
                        className='btn-outline join-item btn-sm btn rounded-bl-none rounded-tl-none'
                        onClick={() => setPage(currentPage + 1)}
                    >
                        Next
                    </button>
                )}

                {currentPage != totalPages ? (
                    <button
                        type='button'
                        className='btn-outline join-item btn-sm btn'
                        onClick={() => setPage(totalPages)}
                    >
                        Last
                    </button>
                ) : null}
            </div>
        </div>
    )
}

export default Pagination

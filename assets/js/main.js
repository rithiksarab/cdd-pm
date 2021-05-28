const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

// Search from the Json File & Filter it.
const searchStudents = async searchText => {
    const res = await fetch('data/data.json')
    const students = await res.json()

    // Find Matches to Current input
    let matches = students.filter(student => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return student.studentId.match(regex) || student.name.match(regex)
    })

    // if (searchText.length === 0) {
    //     matches = []
    //     matchList.innerHTML = ''
    // }

    outputHtml(matches)
}

// Displaying Results In HTML
    const outputHtml = matches => {
        if (matches.length > 0) {
            const html = matches.map(match => `
            <div class="col-md-3 col-sm-12">
                <div class="card border-dark mb-3 mt-3 mr-2 ml-2" >
                    <div class="card-header"><b>${match.studentId}</b></div>
                    <div class="card-body">
                        <h4 class="card-title">${match.name}</h4>
                        <p class="card-text">${match.bio}</p>
                        <div align='center'>
                            <a href="${match.githubURL}" target='_blank' class="btn btn-outline-primary mt-1">
                            <i class="fab fa-github"></i>&nbsp;GitHub</a>
                            <a href="${match.linkedInURL}" target='_blank' class="btn btn-outline-info mt-1">
                            <i class="fab fa-linkedin"></i>&nbsp;LinkedIN</a>
                        </div>
                    </div>
                </div>
                </div>
            `).join('')
            matchList.innerHTML = html
        }
    }

search.addEventListener('input', () => searchStudents(search.value))



function AllData() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            });
    }, []);

    return (
        <>
            <p>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                 View Account Holders
                </button>
            </p>
            <div style={{ minHeight: '120px' }}>
                <div class="collapse collapse-horizontal" id="collapseWidthExample">
                    <div class="card card-body" style={{ width: '300px' }}>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            {data.map((user, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                                            {user.name}
                                        </button>
                                    </h2>
                                    <div id={`flush-collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            Name: {user.name}<br />
                                            Email: {user.email}<br />
                                            Password: {user.password}<br />
                                            Balance: {user.balance || 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



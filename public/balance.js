
function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ? <BalanceForm setShow={setShow} setStatus={setStatus} /> : <BalanceMsg setShow={setShow} />}
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');

  function handle() {
    fetch('/account/find/' + email)
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          props.setStatus('Your balance is: ' + user.balance);
        } else {
          props.setStatus('fail! User not found');
        }
        props.setShow(false);
      })
      .catch((err) => {
        console.log(err);
        props.setStatus('fail! Unable to fetch balance');
      });
  }

  return (
    <>
      Email
      <br />
      <input type="input" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Check Balance
      </button>
    </>
  );
}

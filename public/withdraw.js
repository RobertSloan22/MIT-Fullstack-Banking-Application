
function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handleWithdraw(email, amount) {
    // Using negative amount for withdrawal
    fetch('/account/update/' + email + '/' + (-amount))
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        // Assuming user object contains updated balance
        ctx.users.find((u) => u.email === email).balance = user.balance;
        setStatus('');
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
        setStatus('fail!');
      });
  }

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? <WithdrawForm handleWithdraw={handleWithdraw} /> : <WithdrawMsg setShow={setShow} />}
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button type="submit" className="btn btn-light" onClick={() => props.setShow(true)}>
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle() {
    props.handleWithdraw(email, amount);
  }

  return (
    <>
      Email
      <br />
      <input type="input" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      <br />
      Amount
      <br />
      <input type="number" className="form-control" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.currentTarget.value)} />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Withdraw
      </button>
    </>
  );
}

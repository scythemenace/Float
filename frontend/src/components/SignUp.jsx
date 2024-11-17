export function SignUp() {
  return (
    <>
      <h2>Sign Up</h2>
      <p>Enter your information to create an account</p>
      <h5>First Name</h5>
      <input type="text" id="fname" name="fname" />
      <h5>Last Name</h5>
      <input type="text" id="lname" name="lname" />
      <br />
      <br />
      <h5>Email</h5>
      <input id="emailAddress" type="email" />
      <h5>Password</h5>
      <input id="password" type="password" />
    </>
  );
}

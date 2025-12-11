class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    }); //apparently slots only work with the shadow dom?
  }
  connectedCallback() {
    this.html = `<style>
      /****** LOGIN MODAL ******/
      #login-modal {
          background:black;
          position:fixed;
          width:100vw;
          height:100vh;
      }
      .loginmodal-container {
        padding: 30px;
        max-width: 350px;
        width: 100% !important;
        background-color: #F7F7F7;
        margin: 0 auto;
        border-radius: 2px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue", Arial, sans-serif;
      }
      .loginmodal-container h1 {
        text-align: center;
        font-size: 1.8em;
      }
      .loginmodal-container input[type=submit] {
        width: 100%;
        display: block;
        margin-bottom: 10px;
        position: relative;
      }
      input[type=password] {
        height: 44px;
        font-size: 16px;
        width: 100%;
        margin-bottom: 10px;
        -webkit-appearance: none;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-top: 1px solid #c0c0c0;
        padding: 0 8px;
        box-sizing: border-box;
      }
      input[type=password]:hover {
        border: 1px solid #b9b9b9;
        border-top: 1px solid #a0a0a0;
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
      }
      .loginmodal {
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        height: 36px;
        padding: 0 8px;
      }
      .loginmodal-submit {
        border: 0px;
        color: #fff;
        text-shadow: 0 1px rgba(0,0,0,0.1); 
        background-color: #4d90fe;
        padding: 17px 0px;
        font-size: 14px;
      }
      .loginmodal-submit:hover {
        border: 0px;
        text-shadow: 0 1px rgba(0,0,0,0.3);
        background-color: #357ae8;
      }
    </style>
    <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="loginmodal-container">
          <h1>Login</h1><br>
          <p>This is a school project</p>
          <p>The password is <code>kea</code></p>
          <form>
            <input type="password" name="pass" placeholder="Password">
            <input type="submit" name="login" class="login loginmodal-submit" value="Login">
          </form>
        </div>
      </div>
    </div>`;
    this.render();

    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.shadowRoot.querySelector("input[name=pass]").value === "kea") {
        document.querySelector("#totally-delete-me").remove();
        localStorage.setItem("iform-totally-logged-in", true);
      }
    });
  }
  render() {
    this.shadowRoot.innerHTML = this.html;
  }
}
customElements.define("iform-login", Login);
window.addEventListener("load", () => {
  if (!localStorage.getItem("iform-totally-logged-in")) {
    const div = document.createElement("div");
    div.id = "totally-delete-me";
    div.style.width = "100vw";
    div.style.height = "100vh";
    div.style.position = "fixed";
    div.style.zIndex = "9999";

    div.innerHTML = "<iform-login />";
    document.body.prepend(div);
  }
});

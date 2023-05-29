const user = [
  { id: 1, username: "lala", adress: "Jakarta" },
  { id: 2, username: "lili", adress: "Surabaya" },
  { id: 3, username: "lala", adress: "Bogor" },
];

const transaction = [
  {
    user_id: 1,
    transaction: [
      {
        id: 1,
        status: "selesai",
      },
      { id: 2, status: "sedang dikirim" },
    ],
  },
  {
    user_id: 2,
    transaction: [
      { id: 1, status: "selesai" },
      { id: 2, status: "dibatalkan" },
    ],
  },
];

const detailTransaction = [
  { id: 1, productName: "Kopi" },
  { id: 2, productName: "Laptop" },
];

// ~~~~~~~~~~~~~~~~~~~~~~ Callback ~~~~~~~~~~~~~~~~~~~~~

function showTrans(id, callback) {
  setTimeout(() => {
    let res = transaction.filter((e) => e.user_id === id);
    return callback(res);
  }, 700);
}

function showdetail(id) {
  setTimeout(() => {
    let res = detailTransaction.filter((e) => e.id === id);
    return res;
  }, 900);
}

function login(id, callback) {
  setTimeout(() => {
    let res = user.filter((e) => e.id === id);
    return callback(res);
  }, 500);
}

login(1, function (user) {
  console.log(user);
  showTrans(user[0].id, function (res) {
    console.log(res);
    showTrans(res[0].user_id, function (detail) {
      console.log(detail);
    });
  });
});

// ~~~~~~~~~~~~~~~~~~~~~~ Promise ~~~~~~~~~~~~~~~~~~~~~

function name(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(user.filter((item) => item.username === username));
    }, 500);
  });
}

function transaction(user_id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(transaction.filter((item) => item.user_id === user_id)[0].transaction);
    }, 500);
  });
}

function detailTransaction(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(detailTransaction.filter((item) => item.id === id)[0]);
    }, 500);
  });
}

async function getData(username) {
  const user = await auth(username);
  const transaction = await transaction(user[0].id);
  const detailTransaction = await detailTransaction(transaction[0].id);
  console.log(detailTransaction);
}

getData("lili");

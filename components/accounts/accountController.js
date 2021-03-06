const models = require('../../models');
const accountService = require('./accountService');

let listAccountAdmin = async (req, res) => {
    const accountList = await accountService.listAdmin();
    res.render('accounts/accountAdminList', { accountList });
}


let info = async (req, res) => {
    const infoAccount = await accountService.getOneAccountById(req.user.MaAdmin);
    res.render('accounts/profile', { infoAccount });
}

let createAccountAdmin = async (req, res) => {
    const check = await accountService.createNewAdmin(req.body);
    if (check == false) {
        res.render('accounts/InsertAdmin', { message: 'Tên đăng nhập đã tồn tại!' })
    }
    else
        await listAccountAdmin(req, res);
}

let listAccountCustomer = async (req, res) => {
    const accountList = await accountService.listCustomer();
    let accountBlocked = 0;
    accountList.forEach(value => {
        if (value.is_block === 1)
            accountBlocked++;
    });
    const accountActive = accountList.length - accountBlocked;

    let pageNumber = 0
    if (!isNaN(req.query.page) && req.query.page > 0)
        pageNumber = req.query.page - 1;
    else
        pageNumber = 0;

    const itemPerPage = 6
    const accountInPage = await accountService.listCustomerInPage(pageNumber, itemPerPage);
    res.render('accounts/accountList', { accountInPage, numberAccount: accountList.length, accountBlocked, accountActive, currentPage: pageNumber + 1 });
}

let handlingAccount = async (req, res) => {
    if (req.body.choose === 'detail') {
        const detailAccount = await accountService.detailAccount(req.body);
        console.log("🚀 ~ file: accountController.js ~ line 47 ~ handlingAccount ~ detailAccount", detailAccount)
        return res.render('accounts/detailCustomer', { detailAccount: detailAccount[0] });
    }
    if (req.body.choose === 'del')
        await accountService.delAccount(req.body);
    else if (req.body.choose === 'block')
        await accountService.blockAccount(req.body);
    else if (req.body.choose === 'unblock')
        await accountService.unblockAccount(req.body);

    await listAccountCustomer(req, res)
}

let editInfo = async (req, res) => {
    await accountService.editInfo(req.user.MaAdmin, req.body);
    await info(req, res);
}

module.exports = {
    listAccountAdmin: listAccountAdmin,
    listAccountCustomer: listAccountCustomer,
    info: info,
    createAccountAdmin: createAccountAdmin,
    handlingAccount: handlingAccount,
    editInfo: editInfo
};
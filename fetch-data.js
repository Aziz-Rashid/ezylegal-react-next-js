"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var api_1 = require("./api");
var file_paths_1 = require("./constants/file-paths");
var graphql_1 = require("./constants/graphql");
var hierarchicalBuilder_1 = require("./utils/hierarchicalBuilder");
var homepageLinkMapper_1 = require("./utils/homepageLinkMapper");
var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {

    var menuRes, menuData, menuRes2, homepageData, termsdata, privacy, ProductCatagory, productsCategoriesRes, productsCategoriesData, products, blogsCatRes, blogsCat, blogRes, blogs, error_1;

    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 18, , 19]);
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.MENU_QUERY })];
            case 1:
                menuRes = _a.sent();
                menuData = menuRes.data.data.menus.nodes.reduce(function (res, menu) {
                    res[menu.slug] = hierarchicalBuilder_1["default"](menu.menuItems.nodes);
                    return res;
                }, {});
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.MENUS_FILE, JSON.stringify(menuData))];
            case 2:
                _a.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.Home })];
            case 3:
                menuRes2 = _a.sent();
                homepageData = homepageLinkMapper_1["default"](menuRes2.data.data);
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.Home_File, JSON.stringify(homepageData))];
            case 4:
                _a.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.Product_Catagory_Lists })];
            case 5:
                ProductCatagory = _a.sent();
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.Product_Catagory_List, JSON.stringify(ProductCatagory.data.data))];
            case 6:
                _a.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.Terms_Condition })];
            case 7:
                termsdata = _a.sent();
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.Terms_File, JSON.stringify(termsdata.data.data))];
            case 8:
                _a.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.Privacy_Query })];
            case 9:
                privacy = _a.sent();
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.Privacy_File, JSON.stringify(privacy.data.data))];
            case 10:
                _a.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.PRODUCT_CATEGORY_QUERY })];
            case 11:
                productsCategoriesRes = _a.sent();
                productsCategoriesData = productsCategoriesRes.data.data.productCategories.nodes
                    .filter(function (productsCategory) { return productsCategory.slug !== "uncategorized"; })
                    .map(function (productsCategory) {
                    productsCategory.products = productsCategory.products.nodes;
                    productsCategory.products = productsCategory.products.map(function (product) {
                        // productTypes mapping
                        product.productTypes = product.productTypes.nodes.length && product.productTypes.nodes[0].name;
                        // variations mapping
                        product.variations = product.variations && product.variations.nodes.map(function (item) {
                            item.description = item.description && item.description.split(/\r?\n/);
                            return item;
                        });
                        // Upsell product mapping
                        product.upsell = product.upsell && product.upsell.nodes;
                        return product;
                    });
                    return productsCategory;
                });
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.CATEGORIES_FILE, JSON.stringify(productsCategoriesData))];
            case 12:
                _a.sent();
                products = lodash_1.flatMap(productsCategoriesData, function (_a) {
                    var products = _a.products, value = __rest(_a, ["products"]);
                    return products.map(function (product) { return (__assign(__assign({}, product), { category: value })); });
                });
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.PRODUCTS_FILE, JSON.stringify(products))];
            case 13:
                _a.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.BLOG_CATEGORY_QUERY })];
            case 14:
                blogsCatRes = _a.sent();
                blogsCat = blogsCatRes.data.data.categories.nodes;
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.BLOG_CATEGORIES_FILE, JSON.stringify(blogsCat))];
            case 15:
                _a.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.BLOG_QUERY })];
            case 16:
                blogRes = _a.sent();
                blogs = blogRes.data.data.posts.nodes.map(function (blog) {
                    blog.tags = blog.tags.nodes;
                    blog.categories = blog.categories.nodes;
                    blog.author = blog.author && blog.author.node;
                    blog.featuredImage = blog.featuredImage && blog.featuredImage.node;
                    return blog;
                });
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.BLOGS_FILE, JSON.stringify(blogs))];
            case 17:
                _a.sent();
                return [2 /*return*/, "Data fetched"];
            case 18:
                error_1 = _a.sent();
                throw error_1;
            case 19: return [2 /*return*/];
        }
    });
}); };
fetchData()
    .then(console.log)["catch"](console.log);

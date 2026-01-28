"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/builds/[id]/vote/route";
exports.ids = ["app/api/builds/[id]/vote/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute&page=%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute&page=%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_epitome_src_app_api_builds_id_vote_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/builds/[id]/vote/route.ts */ \"(rsc)/./src/app/api/builds/[id]/vote/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/builds/[id]/vote/route\",\n        pathname: \"/api/builds/[id]/vote\",\n        filename: \"route\",\n        bundlePath: \"app/api/builds/[id]/vote/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\epitome\\\\src\\\\app\\\\api\\\\builds\\\\[id]\\\\vote\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_epitome_src_app_api_builds_id_vote_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/builds/[id]/vote/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZidWlsZHMlMkYlNUJpZCU1RCUyRnZvdGUlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmJ1aWxkcyUyRiU1QmlkJTVEJTJGdm90ZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmJ1aWxkcyUyRiU1QmlkJTVEJTJGdm90ZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q2VwaXRvbWUlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNEZXNrdG9wJTVDZXBpdG9tZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDOEI7QUFDM0c7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGl0b21lLWNvZGV4Lz85Y2U4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxlcGl0b21lXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGJ1aWxkc1xcXFxbaWRdXFxcXHZvdGVcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2J1aWxkcy9baWRdL3ZvdGUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9idWlsZHMvW2lkXS92b3RlXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9idWlsZHMvW2lkXS92b3RlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXGVwaXRvbWVcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYnVpbGRzXFxcXFtpZF1cXFxcdm90ZVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYnVpbGRzL1tpZF0vdm90ZS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute&page=%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/builds/[id]/vote/route.ts":
/*!***********************************************!*\
  !*** ./src/app/api/builds/[id]/vote/route.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\n\n\n// GET /api/builds/[id]/vote - Get user's vote on a build\nasync function GET(request, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        const { id } = await params;\n        if (!session?.user?.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                userVote: null\n            });\n        }\n        const vote = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.vote.findUnique({\n            where: {\n                userId_buildId: {\n                    userId: session.user.id,\n                    buildId: id\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            userVote: vote ? vote.value === 1 ? \"up\" : \"down\" : null\n        });\n    } catch (error) {\n        console.error(\"Error getting vote:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            userVote: null\n        });\n    }\n}\n// POST /api/builds/[id]/vote - Vote on a build\nasync function POST(request, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"You must be logged in to vote\"\n            }, {\n                status: 401\n            });\n        }\n        const { id } = await params;\n        const body = await request.json();\n        const { type } = body // 'up' or 'down'\n        ;\n        if (!type || ![\n            \"up\",\n            \"down\"\n        ].includes(type)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid vote type\"\n            }, {\n                status: 400\n            });\n        }\n        const existingBuild = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.build.findUnique({\n            where: {\n                id\n            }\n        });\n        if (!existingBuild) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Build not found\"\n            }, {\n                status: 404\n            });\n        }\n        const voteValue = type === \"up\" ? 1 : -1;\n        // Check if user already voted\n        const existingVote = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.vote.findUnique({\n            where: {\n                userId_buildId: {\n                    userId: session.user.id,\n                    buildId: id\n                }\n            }\n        });\n        let upvoteDelta = 0;\n        let downvoteDelta = 0;\n        if (existingVote) {\n            if (existingVote.value === voteValue) {\n                // Same vote - remove it (toggle off)\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.vote.delete({\n                    where: {\n                        id: existingVote.id\n                    }\n                });\n                if (voteValue === 1) {\n                    upvoteDelta = -1;\n                } else {\n                    downvoteDelta = -1;\n                }\n            } else {\n                // Different vote - update it\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.vote.update({\n                    where: {\n                        id: existingVote.id\n                    },\n                    data: {\n                        value: voteValue\n                    }\n                });\n                if (voteValue === 1) {\n                    // Changed from down to up\n                    upvoteDelta = 1;\n                    downvoteDelta = -1;\n                } else {\n                    // Changed from up to down\n                    upvoteDelta = -1;\n                    downvoteDelta = 1;\n                }\n            }\n        } else {\n            // New vote\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.vote.create({\n                data: {\n                    userId: session.user.id,\n                    buildId: id,\n                    value: voteValue\n                }\n            });\n            if (voteValue === 1) {\n                upvoteDelta = 1;\n            } else {\n                downvoteDelta = 1;\n            }\n        }\n        // Update build vote counts\n        const build = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.build.update({\n            where: {\n                id\n            },\n            data: {\n                upvotes: {\n                    increment: upvoteDelta\n                },\n                downvotes: {\n                    increment: downvoteDelta\n                }\n            }\n        });\n        // Ensure counts don't go negative (safety check)\n        if (build.upvotes < 0 || build.downvotes < 0) {\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.build.update({\n                where: {\n                    id\n                },\n                data: {\n                    upvotes: Math.max(0, build.upvotes),\n                    downvotes: Math.max(0, build.downvotes)\n                }\n            });\n        }\n        // Get current user vote status\n        const currentVote = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.vote.findUnique({\n            where: {\n                userId_buildId: {\n                    userId: session.user.id,\n                    buildId: id\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            upvotes: Math.max(0, build.upvotes),\n            downvotes: Math.max(0, build.downvotes),\n            userVote: currentVote ? currentVote.value === 1 ? \"up\" : \"down\" : null\n        });\n    } catch (error) {\n        console.error(\"Error voting on build:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to vote on build\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9idWlsZHMvW2lkXS92b3RlL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBdUQ7QUFDbEI7QUFDTztBQUNKO0FBRXhDLHlEQUF5RDtBQUNsRCxlQUFlSSxJQUNwQkMsT0FBb0IsRUFDcEIsRUFBRUMsTUFBTSxFQUF1QztJQUUvQyxJQUFJO1FBQ0YsTUFBTUMsVUFBVSxNQUFNTCwyREFBZ0JBLENBQUNDLGtEQUFXQTtRQUNsRCxNQUFNLEVBQUVLLEVBQUUsRUFBRSxHQUFHLE1BQU1GO1FBRXJCLElBQUksQ0FBQ0MsU0FBU0UsTUFBTUQsSUFBSTtZQUN0QixPQUFPUixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO2dCQUFFQyxVQUFVO1lBQUs7UUFDNUM7UUFFQSxNQUFNQyxPQUFPLE1BQU1YLCtDQUFNQSxDQUFDVyxJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUN4Q0MsT0FBTztnQkFDTEMsZ0JBQWdCO29CQUNkQyxRQUFRVCxRQUFRRSxJQUFJLENBQUNELEVBQUU7b0JBQ3ZCUyxTQUFTVDtnQkFDWDtZQUNGO1FBQ0Y7UUFFQSxPQUFPUixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQ3ZCQyxVQUFVQyxPQUFRQSxLQUFLTSxLQUFLLEtBQUssSUFBSSxPQUFPLFNBQVU7UUFDeEQ7SUFDRixFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLHVCQUF1QkE7UUFDckMsT0FBT25CLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsVUFBVTtRQUFLO0lBQzVDO0FBQ0Y7QUFFQSwrQ0FBK0M7QUFDeEMsZUFBZVUsS0FDcEJoQixPQUFvQixFQUNwQixFQUFFQyxNQUFNLEVBQXVDO0lBRS9DLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1MLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBRWxELElBQUksQ0FBQ0ksU0FBU0UsTUFBTUQsSUFBSTtZQUN0QixPQUFPUixxREFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtnQkFBRVMs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Z0JBQ3hCbkIsT0FBTztvQkFBRU47Z0JBQUc7Z0JBQ1owQixNQUFNO29CQUNKRSxTQUFTRyxLQUFLQyxHQUFHLENBQUMsR0FBR2IsTUFBTVMsT0FBTztvQkFDbENFLFdBQVdDLEtBQUtDLEdBQUcsQ0FBQyxHQUFHYixNQUFNVyxTQUFTO2dCQUN4QztZQUNGO1FBQ0Y7UUFFQSwrQkFBK0I7UUFDL0IsTUFBTUcsY0FBYyxNQUFNeEMsK0NBQU1BLENBQUNXLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQy9DQyxPQUFPO2dCQUNMQyxnQkFBZ0I7b0JBQ2RDLFFBQVFULFFBQVFFLElBQUksQ0FBQ0QsRUFBRTtvQkFDdkJTLFNBQVNUO2dCQUNYO1lBQ0Y7UUFDRjtRQUVBLE9BQU9SLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFDdkIwQixTQUFTRyxLQUFLQyxHQUFHLENBQUMsR0FBR2IsTUFBTVMsT0FBTztZQUNsQ0UsV0FBV0MsS0FBS0MsR0FBRyxDQUFDLEdBQUdiLE1BQU1XLFNBQVM7WUFDdEMzQixVQUFVOEIsY0FBZUEsWUFBWXZCLEtBQUssS0FBSyxJQUFJLE9BQU8sU0FBVTtRQUN0RTtJQUNGLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsMEJBQTBCQTtRQUN4QyxPQUFPbkIscURBQVlBLENBQUNVLElBQUksQ0FDdEI7WUFBRVMsT0FBTztRQUEwQixHQUNuQztZQUFFRyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2VwaXRvbWUtY29kZXgvLi9zcmMvYXBwL2FwaS9idWlsZHMvW2lkXS92b3RlL3JvdXRlLnRzP2RjYmIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJ1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcblxuLy8gR0VUIC9hcGkvYnVpbGRzL1tpZF0vdm90ZSAtIEdldCB1c2VyJ3Mgdm90ZSBvbiBhIGJ1aWxkXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKFxuICByZXF1ZXN0OiBOZXh0UmVxdWVzdCxcbiAgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyBpZDogc3RyaW5nIH0+IH1cbikge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHBhcmFtc1xuXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdXNlclZvdGU6IG51bGwgfSlcbiAgICB9XG5cbiAgICBjb25zdCB2b3RlID0gYXdhaXQgcHJpc21hLnZvdGUuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWRfYnVpbGRJZDoge1xuICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgIGJ1aWxkSWQ6IGlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHVzZXJWb3RlOiB2b3RlID8gKHZvdGUudmFsdWUgPT09IDEgPyAndXAnIDogJ2Rvd24nKSA6IG51bGwsXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBnZXR0aW5nIHZvdGU6JywgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgdXNlclZvdGU6IG51bGwgfSlcbiAgfVxufVxuXG4vLyBQT1NUIC9hcGkvYnVpbGRzL1tpZF0vdm90ZSAtIFZvdGUgb24gYSBidWlsZFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QoXG4gIHJlcXVlc3Q6IE5leHRSZXF1ZXN0LFxuICB7IHBhcmFtcyB9OiB7IHBhcmFtczogUHJvbWlzZTx7IGlkOiBzdHJpbmcgfT4gfVxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdZb3UgbXVzdCBiZSBsb2dnZWQgaW4gdG8gdm90ZScgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgeyBpZCB9ID0gYXdhaXQgcGFyYW1zXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG4gICAgY29uc3QgeyB0eXBlIH0gPSBib2R5IC8vICd1cCcgb3IgJ2Rvd24nXG5cbiAgICBpZiAoIXR5cGUgfHwgIVsndXAnLCAnZG93biddLmluY2x1ZGVzKHR5cGUpKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdJbnZhbGlkIHZvdGUgdHlwZScgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgZXhpc3RpbmdCdWlsZCA9IGF3YWl0IHByaXNtYS5idWlsZC5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgfSlcblxuICAgIGlmICghZXhpc3RpbmdCdWlsZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnQnVpbGQgbm90IGZvdW5kJyB9LFxuICAgICAgICB7IHN0YXR1czogNDA0IH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCB2b3RlVmFsdWUgPSB0eXBlID09PSAndXAnID8gMSA6IC0xXG5cbiAgICAvLyBDaGVjayBpZiB1c2VyIGFscmVhZHkgdm90ZWRcbiAgICBjb25zdCBleGlzdGluZ1ZvdGUgPSBhd2FpdCBwcmlzbWEudm90ZS5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIHVzZXJJZF9idWlsZElkOiB7XG4gICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgYnVpbGRJZDogaWQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICBsZXQgdXB2b3RlRGVsdGEgPSAwXG4gICAgbGV0IGRvd252b3RlRGVsdGEgPSAwXG5cbiAgICBpZiAoZXhpc3RpbmdWb3RlKSB7XG4gICAgICBpZiAoZXhpc3RpbmdWb3RlLnZhbHVlID09PSB2b3RlVmFsdWUpIHtcbiAgICAgICAgLy8gU2FtZSB2b3RlIC0gcmVtb3ZlIGl0ICh0b2dnbGUgb2ZmKVxuICAgICAgICBhd2FpdCBwcmlzbWEudm90ZS5kZWxldGUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ1ZvdGUuaWQgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAodm90ZVZhbHVlID09PSAxKSB7XG4gICAgICAgICAgdXB2b3RlRGVsdGEgPSAtMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvd252b3RlRGVsdGEgPSAtMVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEaWZmZXJlbnQgdm90ZSAtIHVwZGF0ZSBpdFxuICAgICAgICBhd2FpdCBwcmlzbWEudm90ZS51cGRhdGUoe1xuICAgICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZ1ZvdGUuaWQgfSxcbiAgICAgICAgICBkYXRhOiB7IHZhbHVlOiB2b3RlVmFsdWUgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAodm90ZVZhbHVlID09PSAxKSB7XG4gICAgICAgICAgLy8gQ2hhbmdlZCBmcm9tIGRvd24gdG8gdXBcbiAgICAgICAgICB1cHZvdGVEZWx0YSA9IDFcbiAgICAgICAgICBkb3dudm90ZURlbHRhID0gLTFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDaGFuZ2VkIGZyb20gdXAgdG8gZG93blxuICAgICAgICAgIHVwdm90ZURlbHRhID0gLTFcbiAgICAgICAgICBkb3dudm90ZURlbHRhID0gMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5ldyB2b3RlXG4gICAgICBhd2FpdCBwcmlzbWEudm90ZS5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdXNlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgICAgYnVpbGRJZDogaWQsXG4gICAgICAgICAgdmFsdWU6IHZvdGVWYWx1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG5cbiAgICAgIGlmICh2b3RlVmFsdWUgPT09IDEpIHtcbiAgICAgICAgdXB2b3RlRGVsdGEgPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb3dudm90ZURlbHRhID0gMVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBidWlsZCB2b3RlIGNvdW50c1xuICAgIGNvbnN0IGJ1aWxkID0gYXdhaXQgcHJpc21hLmJ1aWxkLnVwZGF0ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgICAgZGF0YToge1xuICAgICAgICB1cHZvdGVzOiB7IGluY3JlbWVudDogdXB2b3RlRGVsdGEgfSxcbiAgICAgICAgZG93bnZvdGVzOiB7IGluY3JlbWVudDogZG93bnZvdGVEZWx0YSB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgLy8gRW5zdXJlIGNvdW50cyBkb24ndCBnbyBuZWdhdGl2ZSAoc2FmZXR5IGNoZWNrKVxuICAgIGlmIChidWlsZC51cHZvdGVzIDwgMCB8fCBidWlsZC5kb3dudm90ZXMgPCAwKSB7XG4gICAgICBhd2FpdCBwcmlzbWEuYnVpbGQudXBkYXRlKHtcbiAgICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHVwdm90ZXM6IE1hdGgubWF4KDAsIGJ1aWxkLnVwdm90ZXMpLFxuICAgICAgICAgIGRvd252b3RlczogTWF0aC5tYXgoMCwgYnVpbGQuZG93bnZvdGVzKSxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gR2V0IGN1cnJlbnQgdXNlciB2b3RlIHN0YXR1c1xuICAgIGNvbnN0IGN1cnJlbnRWb3RlID0gYXdhaXQgcHJpc21hLnZvdGUuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWRfYnVpbGRJZDoge1xuICAgICAgICAgIHVzZXJJZDogc2Vzc2lvbi51c2VyLmlkLFxuICAgICAgICAgIGJ1aWxkSWQ6IGlkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHVwdm90ZXM6IE1hdGgubWF4KDAsIGJ1aWxkLnVwdm90ZXMpLFxuICAgICAgZG93bnZvdGVzOiBNYXRoLm1heCgwLCBidWlsZC5kb3dudm90ZXMpLFxuICAgICAgdXNlclZvdGU6IGN1cnJlbnRWb3RlID8gKGN1cnJlbnRWb3RlLnZhbHVlID09PSAxID8gJ3VwJyA6ICdkb3duJykgOiBudWxsLFxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3Igdm90aW5nIG9uIGJ1aWxkOicsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gdm90ZSBvbiBidWlsZCcgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsIkdFVCIsInJlcXVlc3QiLCJwYXJhbXMiLCJzZXNzaW9uIiwiaWQiLCJ1c2VyIiwianNvbiIsInVzZXJWb3RlIiwidm90ZSIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInVzZXJJZF9idWlsZElkIiwidXNlcklkIiwiYnVpbGRJZCIsInZhbHVlIiwiZXJyb3IiLCJjb25zb2xlIiwiUE9TVCIsInN0YXR1cyIsImJvZHkiLCJ0eXBlIiwiaW5jbHVkZXMiLCJleGlzdGluZ0J1aWxkIiwiYnVpbGQiLCJ2b3RlVmFsdWUiLCJleGlzdGluZ1ZvdGUiLCJ1cHZvdGVEZWx0YSIsImRvd252b3RlRGVsdGEiLCJkZWxldGUiLCJ1cGRhdGUiLCJkYXRhIiwiY3JlYXRlIiwidXB2b3RlcyIsImluY3JlbWVudCIsImRvd252b3RlcyIsIk1hdGgiLCJtYXgiLCJjdXJyZW50Vm90ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/builds/[id]/vote/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/discord */ \"(rsc)/./node_modules/next-auth/providers/discord.js\");\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    providers: [\n        (0,next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.DISCORD_CLIENT_ID,\n            clientSecret: process.env.DISCORD_CLIENT_SECRET,\n            profile (profile) {\n                return {\n                    id: profile.id,\n                    name: profile.username,\n                    email: profile.email,\n                    image: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,\n                    username: profile.username,\n                    discordId: profile.id,\n                    role: \"USER\"\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async session ({ session, user }) {\n            if (session.user) {\n                session.user.id = user.id;\n                session.user.role = user.role || \"USER\";\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUN5RDtBQUNMO0FBQ25CO0FBRTFCLE1BQU1HLGNBQStCO0lBQzFDQyxTQUFTSCxtRUFBYUEsQ0FBQ0MsMkNBQU1BO0lBQzdCRyxXQUFXO1FBQ1RMLHVFQUFlQSxDQUFDO1lBQ2RNLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCO1lBQ3ZDQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLHFCQUFxQjtZQUMvQ0MsU0FBUUEsT0FBTztnQkFDYixPQUFPO29CQUNMQyxJQUFJRCxRQUFRQyxFQUFFO29CQUNkQyxNQUFNRixRQUFRRyxRQUFRO29CQUN0QkMsT0FBT0osUUFBUUksS0FBSztvQkFDcEJDLE9BQU9MLFFBQVFNLE1BQU0sR0FDakIsQ0FBQyxtQ0FBbUMsRUFBRU4sUUFBUUMsRUFBRSxDQUFDLENBQUMsRUFBRUQsUUFBUU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUN4RTtvQkFDSkgsVUFBVUgsUUFBUUcsUUFBUTtvQkFDMUJJLFdBQVdQLFFBQVFDLEVBQUU7b0JBQ3JCTyxNQUFNO2dCQUNSO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxNQUFNQyxTQUFRLEVBQUVBLE9BQU8sRUFBRUMsSUFBSSxFQUFFO1lBQzdCLElBQUlELFFBQVFDLElBQUksRUFBRTtnQkFDaEJELFFBQVFDLElBQUksQ0FBQ1YsRUFBRSxHQUFHVSxLQUFLVixFQUFFO2dCQUN6QlMsUUFBUUMsSUFBSSxDQUFDSCxJQUFJLEdBQUcsS0FBY0EsSUFBSSxJQUFJO1lBQzVDO1lBQ0EsT0FBT0U7UUFDVDtJQUNGO0lBQ0FFLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFFBQVFuQixRQUFRQyxHQUFHLENBQUNtQixlQUFlO0FBQ3JDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGl0b21lLWNvZGV4Ly4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IERpc2NvcmRQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2Rpc2NvcmQnXG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSAnQGF1dGgvcHJpc21hLWFkYXB0ZXInXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICcuL3ByaXNtYSdcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSBhcyBhbnksXG4gIHByb3ZpZGVyczogW1xuICAgIERpc2NvcmRQcm92aWRlcih7XG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuRElTQ09SRF9DTElFTlRfSUQhLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5ESVNDT1JEX0NMSUVOVF9TRUNSRVQhLFxuICAgICAgcHJvZmlsZShwcm9maWxlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHByb2ZpbGUuaWQsXG4gICAgICAgICAgbmFtZTogcHJvZmlsZS51c2VybmFtZSxcbiAgICAgICAgICBlbWFpbDogcHJvZmlsZS5lbWFpbCxcbiAgICAgICAgICBpbWFnZTogcHJvZmlsZS5hdmF0YXJcbiAgICAgICAgICAgID8gYGh0dHBzOi8vY2RuLmRpc2NvcmRhcHAuY29tL2F2YXRhcnMvJHtwcm9maWxlLmlkfS8ke3Byb2ZpbGUuYXZhdGFyfS5wbmdgXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgdXNlcm5hbWU6IHByb2ZpbGUudXNlcm5hbWUsXG4gICAgICAgICAgZGlzY29yZElkOiBwcm9maWxlLmlkLFxuICAgICAgICAgIHJvbGU6ICdVU0VSJyxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHVzZXIgfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB1c2VyLmlkXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlIHx8ICdVU0VSJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9sb2dpbicsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufVxuIl0sIm5hbWVzIjpbIkRpc2NvcmRQcm92aWRlciIsIlByaXNtYUFkYXB0ZXIiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsImFkYXB0ZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJESVNDT1JEX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkRJU0NPUkRfQ0xJRU5UX1NFQ1JFVCIsInByb2ZpbGUiLCJpZCIsIm5hbWUiLCJ1c2VybmFtZSIsImVtYWlsIiwiaW1hZ2UiLCJhdmF0YXIiLCJkaXNjb3JkSWQiLCJyb2xlIiwiY2FsbGJhY2tzIiwic2Vzc2lvbiIsInVzZXIiLCJwYWdlcyIsInNpZ25JbiIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFFN0MsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRTtBQUVsRSxJQUFJSSxJQUF5QixFQUFjSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGl0b21lLWNvZGV4Ly4vc3JjL2xpYi9wcmlzbWEudHM/MDFkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcbn1cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute&page=%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbuilds%2F%5Bid%5D%2Fvote%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
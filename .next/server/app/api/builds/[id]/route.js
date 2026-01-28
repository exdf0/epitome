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
exports.id = "app/api/builds/[id]/route";
exports.ids = ["app/api/builds/[id]/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute&page=%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute&page=%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_epitome_src_app_api_builds_id_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/builds/[id]/route.ts */ \"(rsc)/./src/app/api/builds/[id]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/builds/[id]/route\",\n        pathname: \"/api/builds/[id]\",\n        filename: \"route\",\n        bundlePath: \"app/api/builds/[id]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\epitome\\\\src\\\\app\\\\api\\\\builds\\\\[id]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_epitome_src_app_api_builds_id_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/builds/[id]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZidWlsZHMlMkYlNUJpZCU1RCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYnVpbGRzJTJGJTVCaWQlNUQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZidWlsZHMlMkYlNUJpZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q2VwaXRvbWUlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3VzZXIlNUNEZXNrdG9wJTVDZXBpdG9tZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDd0I7QUFDckc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lcGl0b21lLWNvZGV4Lz80YjBiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxlcGl0b21lXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGJ1aWxkc1xcXFxbaWRdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9idWlsZHMvW2lkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2J1aWxkcy9baWRdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9idWlsZHMvW2lkXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxlcGl0b21lXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGJ1aWxkc1xcXFxbaWRdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9idWlsZHMvW2lkXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute&page=%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/builds/[id]/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/builds/[id]/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\n\n\n// Helper to parse JSON fields from SQLite\nconst parseBuild = (build)=>({\n        ...build,\n        tags: JSON.parse(build.tags || \"[]\"),\n        statsAllocation: JSON.parse(build.statsAllocation || \"{}\"),\n        equipment: build.equipment ? JSON.parse(build.equipment) : null,\n        skillPoints: JSON.parse(build.skillPoints || \"{}\")\n    });\n// GET /api/builds/[id] - Get a single build\nasync function GET(request, { params }) {\n    try {\n        const { id } = await params;\n        const build = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.build.findUnique({\n            where: {\n                id\n            },\n            include: {\n                user: {\n                    select: {\n                        id: true,\n                        name: true,\n                        username: true,\n                        image: true\n                    }\n                }\n            }\n        });\n        if (!build) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Build not found\"\n            }, {\n                status: 404\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(parseBuild(build));\n    } catch (error) {\n        console.error(\"Error fetching build:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch build\"\n        }, {\n            status: 500\n        });\n    }\n}\n// PUT /api/builds/[id] - Update a build\nasync function PUT(request, { params }) {\n    try {\n        const { id } = await params;\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        const existingBuild = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.build.findUnique({\n            where: {\n                id\n            }\n        });\n        if (!existingBuild) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Build not found\"\n            }, {\n                status: 404\n            });\n        }\n        // Check ownership (if build has an owner)\n        if (existingBuild.userId && existingBuild.userId !== session?.user?.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 403\n            });\n        }\n        const body = await request.json();\n        const build = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.build.update({\n            where: {\n                id\n            },\n            data: {\n                title: body.title,\n                description: body.description,\n                guide: body.guide,\n                class: body.class,\n                level: body.level,\n                tags: JSON.stringify(body.tags || []),\n                statsAllocation: JSON.stringify(body.statsAllocation || {}),\n                equipment: body.equipment ? JSON.stringify(body.equipment) : null,\n                skillPoints: JSON.stringify(body.skillPoints || {}),\n                skillPath: body.skillPath || null,\n                isPublished: body.isPublished\n            },\n            include: {\n                user: {\n                    select: {\n                        id: true,\n                        name: true,\n                        username: true,\n                        image: true\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(parseBuild(build));\n    } catch (error) {\n        console.error(\"Error updating build:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to update build\"\n        }, {\n            status: 500\n        });\n    }\n}\n// DELETE /api/builds/[id] - Delete a build\nasync function DELETE(request, { params }) {\n    try {\n        const { id } = await params;\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        const existingBuild = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.build.findUnique({\n            where: {\n                id\n            }\n        });\n        if (!existingBuild) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Build not found\"\n            }, {\n                status: 404\n            });\n        }\n        // Check ownership (if build has an owner)\n        if (existingBuild.userId && existingBuild.userId !== session?.user?.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 403\n            });\n        }\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.build.delete({\n            where: {\n                id\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Error deleting build:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to delete build\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9idWlsZHMvW2lkXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUF1RDtBQUNsQjtBQUNPO0FBQ0o7QUFFeEMsMENBQTBDO0FBQzFDLE1BQU1JLGFBQWEsQ0FBQ0MsUUFBZ0I7UUFDbEMsR0FBR0EsS0FBSztRQUNSQyxNQUFNQyxLQUFLQyxLQUFLLENBQUNILE1BQU1DLElBQUksSUFBSTtRQUMvQkcsaUJBQWlCRixLQUFLQyxLQUFLLENBQUNILE1BQU1JLGVBQWUsSUFBSTtRQUNyREMsV0FBV0wsTUFBTUssU0FBUyxHQUFHSCxLQUFLQyxLQUFLLENBQUNILE1BQU1LLFNBQVMsSUFBSTtRQUMzREMsYUFBYUosS0FBS0MsS0FBSyxDQUFDSCxNQUFNTSxXQUFXLElBQUk7SUFDL0M7QUFFQSw0Q0FBNEM7QUFDckMsZUFBZUMsSUFDcEJDLE9BQW9CLEVBQ3BCLEVBQUVDLE1BQU0sRUFBdUM7SUFFL0MsSUFBSTtRQUNGLE1BQU0sRUFBRUMsRUFBRSxFQUFFLEdBQUcsTUFBTUQ7UUFFckIsTUFBTVQsUUFBUSxNQUFNSiwrQ0FBTUEsQ0FBQ0ksS0FBSyxDQUFDVyxVQUFVLENBQUM7WUFDMUNDLE9BQU87Z0JBQUVGO1lBQUc7WUFDWkcsU0FBUztnQkFDUEMsTUFBTTtvQkFDSkMsUUFBUTt3QkFDTkwsSUFBSTt3QkFDSk0sTUFBTTt3QkFDTkMsVUFBVTt3QkFDVkMsT0FBTztvQkFDVDtnQkFDRjtZQUNGO1FBQ0Y7UUFFQSxJQUFJLENBQUNsQixPQUFPO1lBQ1YsT0FBT0wscURBQVlBLENBQUN3QixJQUFJLENBQ3RCO2dCQUFFQyxPQUFPO1lBQWtCLEdBQzNCO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxPQUFPMUIscURBQVlBLENBQUN3QixJQUFJLENBQUNwQixXQUFXQztJQUN0QyxFQUFFLE9BQU9vQixPQUFPO1FBQ2RFLFFBQVFGLEtBQUssQ0FBQyx5QkFBeUJBO1FBQ3ZDLE9BQU96QixxREFBWUEsQ0FBQ3dCLElB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QWNDLE1BQU0sS0FBS0YsU0FBU1YsTUFBTUosSUFBSTtZQUN0RSxPQUFPZixxREFBWUEsQ0FBQ3dCLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBZSxHQUN4QjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTXpCLCtDQUFNQSxDQUFDSSxLQUFLLENBQUN1QyxNQUFNLENBQUM7WUFDeEIzQixPQUFPO2dCQUFFRjtZQUFHO1FBQ2Q7UUFFQSxPQUFPZixxREFBWUEsQ0FBQ3dCLElBQUksQ0FBQztZQUFFcUIsU0FBUztRQUFLO0lBQzNDLEVBQUUsT0FBT3BCLE9BQU87UUFDZEUsUUFBUUYsS0FBSyxDQUFDLHlCQUF5QkE7UUFDdkMsT0FBT3pCLHFEQUFZQSxDQUFDd0IsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQXlCLEdBQ2xDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXBpdG9tZS1jb2RleC8uL3NyYy9hcHAvYXBpL2J1aWxkcy9baWRdL3JvdXRlLnRzPzUyNjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJ1xuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gJ25leHQtYXV0aCdcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCdcblxuLy8gSGVscGVyIHRvIHBhcnNlIEpTT04gZmllbGRzIGZyb20gU1FMaXRlXG5jb25zdCBwYXJzZUJ1aWxkID0gKGJ1aWxkOiBhbnkpID0+ICh7XG4gIC4uLmJ1aWxkLFxuICB0YWdzOiBKU09OLnBhcnNlKGJ1aWxkLnRhZ3MgfHwgJ1tdJyksXG4gIHN0YXRzQWxsb2NhdGlvbjogSlNPTi5wYXJzZShidWlsZC5zdGF0c0FsbG9jYXRpb24gfHwgJ3t9JyksXG4gIGVxdWlwbWVudDogYnVpbGQuZXF1aXBtZW50ID8gSlNPTi5wYXJzZShidWlsZC5lcXVpcG1lbnQpIDogbnVsbCxcbiAgc2tpbGxQb2ludHM6IEpTT04ucGFyc2UoYnVpbGQuc2tpbGxQb2ludHMgfHwgJ3t9JyksXG59KVxuXG4vLyBHRVQgL2FwaS9idWlsZHMvW2lkXSAtIEdldCBhIHNpbmdsZSBidWlsZFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChcbiAgcmVxdWVzdDogTmV4dFJlcXVlc3QsXG4gIHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgaWQ6IHN0cmluZyB9PiB9XG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCBwYXJhbXNcblxuICAgIGNvbnN0IGJ1aWxkID0gYXdhaXQgcHJpc21hLmJ1aWxkLmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgaWQgfSxcbiAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIHNlbGVjdDoge1xuICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICAgICAgdXNlcm5hbWU6IHRydWUsXG4gICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgaWYgKCFidWlsZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnQnVpbGQgbm90IGZvdW5kJyB9LFxuICAgICAgICB7IHN0YXR1czogNDA0IH1cbiAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocGFyc2VCdWlsZChidWlsZCkpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYnVpbGQ6JywgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBidWlsZCcgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufVxuXG4vLyBQVVQgL2FwaS9idWlsZHMvW2lkXSAtIFVwZGF0ZSBhIGJ1aWxkXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUFVUKFxuICByZXF1ZXN0OiBOZXh0UmVxdWVzdCxcbiAgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyBpZDogc3RyaW5nIH0+IH1cbikge1xuICB0cnkge1xuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHBhcmFtc1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuXG4gICAgY29uc3QgZXhpc3RpbmdCdWlsZCA9IGF3YWl0IHByaXNtYS5idWlsZC5maW5kVW5pcXVlKHtcbiAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgfSlcblxuICAgIGlmICghZXhpc3RpbmdCdWlsZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnQnVpbGQgbm90IGZvdW5kJyB9LFxuICAgICAgICB7IHN0YXR1czogNDA0IH1cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBDaGVjayBvd25lcnNoaXAgKGlmIGJ1aWxkIGhhcyBhbiBvd25lcilcbiAgICBpZiAoZXhpc3RpbmdCdWlsZC51c2VySWQgJiYgZXhpc3RpbmdCdWlsZC51c2VySWQgIT09IHNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDMgfVxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gICAgY29uc3QgYnVpbGQgPSBhd2FpdCBwcmlzbWEuYnVpbGQudXBkYXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRpdGxlOiBib2R5LnRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbjogYm9keS5kZXNjcmlwdGlvbixcbiAgICAgICAgZ3VpZGU6IGJvZHkuZ3VpZGUsXG4gICAgICAgIGNsYXNzOiBib2R5LmNsYXNzLFxuICAgICAgICBsZXZlbDogYm9keS5sZXZlbCxcbiAgICAgICAgdGFnczogSlNPTi5zdHJpbmdpZnkoYm9keS50YWdzIHx8IFtdKSxcbiAgICAgICAgc3RhdHNBbGxvY2F0aW9uOiBKU09OLnN0cmluZ2lmeShib2R5LnN0YXRzQWxsb2NhdGlvbiB8fCB7fSksXG4gICAgICAgIGVxdWlwbWVudDogYm9keS5lcXVpcG1lbnQgPyBKU09OLnN0cmluZ2lmeShib2R5LmVxdWlwbWVudCkgOiBudWxsLFxuICAgICAgICBza2lsbFBvaW50czogSlNPTi5zdHJpbmdpZnkoYm9keS5za2lsbFBvaW50cyB8fCB7fSksXG4gICAgICAgIHNraWxsUGF0aDogYm9keS5za2lsbFBhdGggfHwgbnVsbCxcbiAgICAgICAgaXNQdWJsaXNoZWQ6IGJvZHkuaXNQdWJsaXNoZWQsXG4gICAgICB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICB1c2VybmFtZTogdHJ1ZSxcbiAgICAgICAgICAgIGltYWdlOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocGFyc2VCdWlsZChidWlsZCkpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgYnVpbGQ6JywgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ZhaWxlZCB0byB1cGRhdGUgYnVpbGQnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH1cbn1cblxuLy8gREVMRVRFIC9hcGkvYnVpbGRzL1tpZF0gLSBEZWxldGUgYSBidWlsZFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShcbiAgcmVxdWVzdDogTmV4dFJlcXVlc3QsXG4gIHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQcm9taXNlPHsgaWQ6IHN0cmluZyB9PiB9XG4pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCBwYXJhbXNcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcblxuICAgIGNvbnN0IGV4aXN0aW5nQnVpbGQgPSBhd2FpdCBwcmlzbWEuYnVpbGQuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZCB9LFxuICAgIH0pXG5cbiAgICBpZiAoIWV4aXN0aW5nQnVpbGQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ0J1aWxkIG5vdCBmb3VuZCcgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgb3duZXJzaGlwIChpZiBidWlsZCBoYXMgYW4gb3duZXIpXG4gICAgaWYgKGV4aXN0aW5nQnVpbGQudXNlcklkICYmIGV4aXN0aW5nQnVpbGQudXNlcklkICE9PSBzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAzIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBhd2FpdCBwcmlzbWEuYnVpbGQuZGVsZXRlKHtcbiAgICAgIHdoZXJlOiB7IGlkIH0sXG4gICAgfSlcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWxldGluZyBidWlsZDonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnRmFpbGVkIHRvIGRlbGV0ZSBidWlsZCcgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInBhcnNlQnVpbGQiLCJidWlsZCIsInRhZ3MiLCJKU09OIiwicGFyc2UiLCJzdGF0c0FsbG9jYXRpb24iLCJlcXVpcG1lbnQiLCJza2lsbFBvaW50cyIsIkdFVCIsInJlcXVlc3QiLCJwYXJhbXMiLCJpZCIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImluY2x1ZGUiLCJ1c2VyIiwic2VsZWN0IiwibmFtZSIsInVzZXJuYW1lIiwiaW1hZ2UiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJjb25zb2xlIiwiUFVUIiwic2Vzc2lvbiIsImV4aXN0aW5nQnVpbGQiLCJ1c2VySWQiLCJib2R5IiwidXBkYXRlIiwiZGF0YSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJndWlkZSIsImNsYXNzIiwibGV2ZWwiLCJzdHJpbmdpZnkiLCJza2lsbFBhdGgiLCJpc1B1Ymxpc2hlZCIsIkRFTEVURSIsImRlbGV0ZSIsInN1Y2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/builds/[id]/route.ts\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/@auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute&page=%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbuilds%2F%5Bid%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Cepitome&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
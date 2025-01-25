# Smart Life Terminal Dashboard 

## Run
```
# Either
docker compose run --rm app
# Or 
docker run --rm -it -v .:/src shellcat/smartlife-tui 
```
## TODO

- [x] create single-screen TUI (`react-blessed-contrib`)
- [x] create separate components based on device types
  - [x] Socket
  - [x] Light
  - [ ] Power Strip
  - [ ] ...
- [ ] implement local state (for caching & grouping)
- [ ] implement authentication TUI flow (dialog) 
- [ ] create connector multiple backends  based on availability
  - [ ] Local state
  - [ ] SmartLife API (`tuya-smartlife-api-node`)
  - [ ] Tuya OpenAPI (`tuya-openapi-node`)
- [ ] dockerize



### Ref

- https://smartathome.co.uk/smartlife/
- https://www.alanwood.net/demos/webdings.html
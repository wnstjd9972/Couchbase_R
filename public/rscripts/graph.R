library(httr)
library(jsonlite)
library(ggplot2)
library(leaflet)

cbServer <- "http://localhost:8093/query/service"
query <- "SELECT a.name, count(*) as total_flights FROM `travel-sample` r JOIN `travel-sample` a ON KEYS r.airlineid WHERE r.type =\"route\" AND a.type=\"airline\" GROUP BY a.name ORDER BY total_flights DESC LIMIT 20"

creds <- "[{\"user\":\"local:travel-sample\", \"pass\":\"password\"}]"
req <- httr::POST(cbServer, httr::add_headers("Content-Type" = "application/x-www-form-urlencoded;charset=UTF-8"), body = paste("statement=", query, "&creds=", creds));
res <- fromJSON(httr::content(req, "text"))

airlineFlights <- res$results
pdf("./public/pdf/a.pdf")
ggplot(data=airlineFlights, aes(x=name, y=total_flights)) + theme(axis.text.x=element_text(angle=90,hjust=1)) + geom_bar(stat="identity")
dev.off()
